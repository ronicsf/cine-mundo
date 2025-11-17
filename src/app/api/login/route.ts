import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    console.log('🔐 Tentando login para:', email);

    // Chamar backend para verificar credenciais
    const loginResponse = await fetch('http://localhost:3001/cliente/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    if (!loginResponse.ok) {
      const errorData = await loginResponse.json();
      console.error('❌ Falha na autenticação:', errorData);
      return NextResponse.json(
        { success: false, error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const loginResult = await loginResponse.json();
    console.log('✅ Cliente autenticado:', loginResult);

    // Inserir novo acesso
    const acessoData = {
      date_time: new Date().toISOString(),
      id_client: loginResult.cliente.id
    };

    console.log('📝 Registrando acesso:', acessoData);

    const acessoResponse = await fetch('http://localhost:3001/acesso', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(acessoData)
    });

    if (!acessoResponse.ok) {
      console.error('❌ Erro ao registrar acesso:', await acessoResponse.text());
      // Não falhar o login por erro no log de acesso, apenas logar
    } else {
      console.log('✅ Acesso registrado com sucesso');
    }

    // Retornar sucesso com dados do cliente
    return NextResponse.json({
      success: true,
      cliente: {
        id: loginResult.cliente.id,
        nome: loginResult.cliente.nome,
        email: loginResult.cliente.email
      }
    });

  } catch (error: any) {
    console.error('❌ Erro no login:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro interno do servidor'
      },
      { status: 500 }
    );
  }
}
