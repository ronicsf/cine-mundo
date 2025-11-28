import { NextRequest, NextResponse } from 'next/server';

const IDS_FIXOS = {
  id_cliente: 2,
  id_sala: 3, 
  id_pagamento: 1,
  id_sessao: 8,
  id_assento: 19
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const compra = {
      filmeId: formData.get('filmeId') as string,
      tipo: formData.get('tipo') as string,
      quantidade: parseInt(formData.get('quantidade') as string),
      clienteId: parseInt(formData.get('clienteId') as string),
      id_sala: IDS_FIXOS.id_sala,
      id_pagamento: IDS_FIXOS.id_pagamento,
      id_sessao: IDS_FIXOS.id_sessao,
      id_assento: IDS_FIXOS.id_assento
    };

    console.log('🛒 Processando compra...');

    // Validação
    if (!compra.filmeId || !compra.tipo || !compra.quantidade || !compra.clienteId) {
      return NextResponse.json(
        { success: false, error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Calcular valor
    const valorUnitario = compra.tipo === 'meia' ? 15 : 30;
    const valorTotal = valorUnitario * compra.quantidade;

    // Dados do ingresso
    const ingressoData = {
      data_hora: new Date().toISOString(),
      valor_total: valorTotal,
      tipo_ingresso: compra.tipo,
      id_cliente: compra.clienteId,
      id_sala: compra.id_sala,
      id_pagamento: compra.id_pagamento,
      id_assento: compra.id_assento,
      id_filme: parseInt(compra.filmeId),
      id_sessao: compra.id_sessao
    };

    console.log('🎫 Ingresso a ser criado:', ingressoData);

    // Inserir no backend
    const backendResponse = await fetch('http://localhost:3001/ingresso', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingressoData)
    });

    const resultado = await backendResponse.json();

    if (!backendResponse.ok) {
      throw new Error(resultado.error || 'Erro ao salvar ingresso');
    }

    console.log('✅ Ingresso criado com sucesso! Número:', resultado.numero);

    // Redirecionar para página de compra finalizada
    return NextResponse.redirect(new URL('/compra-finalizada', request.url));

  } catch (error: any) {
    console.error('❌ Erro na compra:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
}