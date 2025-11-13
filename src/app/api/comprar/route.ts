import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const filmeId = formData.get('filmeId') as string;
    const tipo = formData.get('tipo') as string;
    const quantidade = parseInt(formData.get('quantidade') as string);

    console.log('📦 Dados da compra recebidos:', { filmeId, tipo, quantidade });

    // 1. Verificar se o filme existe
    const filmeResponse = await fetch(`http://localhost:3001/filme/${filmeId}`);
    if (!filmeResponse.ok) {
      throw new Error('Filme não encontrado');
    }

    const filmeData = await filmeResponse.json();
    const filme = filmeData[0];
    console.log('🎬 Filme encontrado:', filme.titulo);

    // 2. Buscar uma sessão existente OU usar dados padrão
    let sessaoId = 1;
    let salaId = 1;
    
    try {
      const sessoesResponse = await fetch('http://localhost:3001/sessao');
      const sessoes = await sessoesResponse.json();
      
      // Buscar qualquer sessão para usar como referência
      if (sessoes.length > 0) {
        const sessao = sessoes[0];
        sessaoId = sessao.id;
        salaId = sessao.id_sala;
        console.log('✅ Usando sessão existente como referência:', sessaoId);
      }
    } catch (error) {
      console.log('⚠️ Usando valores padrão para sessão e sala');
    }

    // 3. Criar pagamento primeiro
    const valorTotal = tipo === 'meia' ? 15 * quantidade : 30 * quantidade;
    
    const pagamentoData = {
      data_hora: new Date().toISOString(),
      valor_pago: valorTotal,
      id_forma_pagamento: 1
    };

    console.log('💳 Criando pagamento...');

    const pagamentoResponse = await fetch('http://localhost:3001/pagamento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pagamentoData)
    });

    if (!pagamentoResponse.ok) {
      throw new Error('Erro ao criar pagamento');
    }

    console.log('✅ Pagamento criado com sucesso');

    // 4. Buscar ID do pagamento criado (mais robusto)
    let pagamentoId = 1;
    try {
      // Aguardar um pouco para o pagamento ser processado
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const pagamentosResponse = await fetch('http://localhost:3001/pagamento');
      const pagamentos = await pagamentosResponse.json();
      
      if (pagamentos.length > 0) {
        // Pegar o último pagamento (mais recente)
        pagamentoId = pagamentos[pagamentos.length - 1].id;
        console.log('✅ ID do pagamento encontrado:', pagamentoId);
      }
    } catch (error) {
      console.log('⚠️ Usando ID de pagamento padrão');
    }

    // 5. Criar ingressos - CORRIGINDO O CAMPO "numero"
    console.log(`🎫 Criando ${quantidade} ingresso(s)...`);

    for (let i = 0; i < quantidade; i++) {
      // Gerar um número único para o ingresso
      const numeroIngresso = Math.floor(Math.random() * 900000) + 100000;
      
      const ingressoData = {
        numero: numeroIngresso, // ✅ AGORA ENVIANDO O CAMPO OBRIGATÓRIO
        data_hora: new Date().toISOString(),
        valor_total: tipo === 'meia' ? 15 : 30,
        tipo_ingresso: tipo,
        id_cliente: 1,
        id_sala: salaId,
        id_pagamento: pagamentoId,
        id_assento: Math.floor(Math.random() * 50) + 1,
        id_sessao: sessaoId
      };

      console.log(`🎫 Ingresso ${i + 1}:`, ingressoData);

      const ingressoResponse = await fetch('http://localhost:3001/ingresso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingressoData)
      });

      if (!ingressoResponse.ok) {
        const errorText = await ingressoResponse.text();
        console.error('❌ Erro detalhado ao criar ingresso:', errorText);
        throw new Error(`Erro ao criar ingresso: ${errorText}`);
      }
      
      console.log(`✅ Ingresso ${i + 1} criado com sucesso! Número: ${numeroIngresso}`);
    }

    console.log('✅ TODOS os ingressos criados com sucesso!');
    
    // Redireciona para página de ingressos
    return NextResponse.redirect(new URL('/ingresso', request.url));

  } catch (error) {
    console.error('❌ Erro na compra:', error);
    
    // Redireciona para página de compra com mensagem de erro
    const url = new URL('/comprar-ingresso', request.url);
    url.searchParams.set('erro', encodeURIComponent(error instanceof Error ? error.message : 'Erro desconhecido'));
    return NextResponse.redirect(url);
  }
}