import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Dados fixos para teste
    const ingressoTeste = {
      numero: 999999,
      data_hora: new Date().toISOString(),
      valor_total: 15,
      tipo_ingresso: 'meia',
      id_cliente: 1,
      id_sala: 1,
      id_pagamento: 1,
      id_assento: 1,
      id_sessao: 1
    };

    console.log('🎫 Teste - Enviando ingresso:', ingressoTeste);

    const response = await fetch('http://localhost:3001/ingresso', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingressoTeste)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro no teste:', errorText);
      return NextResponse.json({ 
        success: false, 
        error: errorText,
        dataSent: ingressoTeste 
      }, { status: 500 });
    }

    console.log('✅ Teste bem-sucedido!');
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('❌ Erro no teste:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    }, { status: 500 });
  }
}