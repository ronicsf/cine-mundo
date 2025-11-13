"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ingresso.module.css';

interface Ingresso {
    id: number;
    numero: number;
    data_hora: string;
    valor_total: number;
    tipo_ingresso: string;
    id_cliente: number;
    id_sala: number;
    id_pagamento: number;
    id_assento: number;
    // Campos adicionais que podemos buscar de outras tabelas
    nome_cliente?: string;
    numero_sala?: string;
    forma_pagamento?: string;
    numero_assento?: string;
}

export default function Ingresso() {
    const [ingressos, setIngressos] = useState<Ingresso[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        carregarIngressos();
    }, []);

    const carregarIngressos = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3001/ingressos");
            
            if (!response.ok) {
                throw new Error(`Erro ao carregar ingressos: ${response.status}`);
            }

            const ingressosData: Ingresso[] = await response.json();
            
            // Se necessário, carregar dados adicionais de outras tabelas
            const ingressosCompletos = await Promise.all(
                ingressosData.map(async (ingresso) => {
                    try {
                        // Carregar dados do cliente
                        const clienteResponse = await fetch(`http://localhost:3001/clientes/${ingresso.id_cliente}`);
                        const clienteData = await clienteResponse.json();
                        
                        // Carregar dados da sala
                        const salaResponse = await fetch(`http://localhost:3001/salas/${ingresso.id_sala}`);
                        const salaData = await salaResponse.json();
                        
                        // Carregar dados do pagamento
                        const pagamentoResponse = await fetch(`http://localhost:3001/formas-pagamento/${ingresso.id_pagamento}`);
                        const pagamentoData = await pagamentoResponse.json();
                        
                        return {
                            ...ingresso,
                            nome_cliente: clienteData.nome || `Cliente ${ingresso.id_cliente}`,
                            numero_sala: salaData.numero || `Sala ${ingresso.id_sala}`,
                            forma_pagamento: pagamentoData.nome || `Pagamento ${ingresso.id_pagamento}`,
                            numero_assento: `A${ingresso.id_assento}`
                        };
                    } catch (error) {
                        console.error(`Erro ao carregar dados do ingresso ${ingresso.id}:`, error);
                        return ingresso; // Retorna ingresso básico se der erro
                    }
                })
            );
            
            setIngressos(ingressosCompletos);
        } catch (error: any) {
            console.error("Erro ao carregar ingressos:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const formatarData = (dataHora: string) => {
        return new Date(dataHora).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatarValor = (valor: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    const getStatusIngresso = (dataHora: string) => {
        const dataSessao = new Date(dataHora);
        const agora = new Date();
        
        if (dataSessao < agora) {
            return { status: 'Expirado', classe: styles.expirado };
        }
        
        const diferencaHoras = (dataSessao.getTime() - agora.getTime()) / (1000 * 60 * 60);
        if (diferencaHoras < 24) {
            return { status: 'Próximo', classe: styles.proximo };
        }
        
        return { status: 'Válido', classe: styles.valido };
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Carregando ingressos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <h2>Erro ao carregar ingressos</h2>
                <p>{error}</p>
                <button 
                    className={styles.retryButton}
                    onClick={carregarIngressos}
                >
                    Tentar Novamente
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>🎫 Meus Ingressos</h1>
                <p>Gerencie e visualize todos os seus ingressos</p>
            </header>

            {ingressos.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>🎭</div>
                    <h3>Nenhum ingresso encontrado</h3>
                    <p>Você ainda não comprou nenhum ingresso.</p>
                    <button 
                        className={styles.buyButton}
                        onClick={() => router.push('/')}
                    >
                        Comprar Ingressos
                    </button>
                </div>
            ) : (
                <div className={styles.ingressosGrid}>
                    {ingressos.map((ingresso) => {
                        const statusInfo = getStatusIngresso(ingresso.data_hora);
                        
                        return (
                            <div key={ingresso.id} className={styles.ingressoCard}>
                                <div className={styles.ingressoHeader}>
                                    <div className={styles.ingressoNumero}>
                                        #{ingresso.numero.toString().padStart(6, '0')}
                                    </div>
                                    <div className={`${styles.status} ${statusInfo.classe}`}>
                                        {statusInfo.status}
                                    </div>
                                </div>

                                <div className={styles.ingressoBody}>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Cliente:</span>
                                        <span className={styles.value}>{ingresso.nome_cliente}</span>
                                    </div>
                                    
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Data e Hora:</span>
                                        <span className={styles.value}>{formatarData(ingresso.data_hora)}</span>
                                    </div>
                                    
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Sala:</span>
                                        <span className={styles.value}>{ingresso.numero_sala}</span>
                                    </div>
                                    
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Assento:</span>
                                        <span className={styles.value}>{ingresso.numero_assento}</span>
                                    </div>
                                    
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Tipo:</span>
                                        <span className={`${styles.value} ${styles.tipoIngresso}`}>
                                            {ingresso.tipo_ingresso}
                                        </span>
                                    </div>
                                    
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Pagamento:</span>
                                        <span className={styles.value}>{ingresso.forma_pagamento}</span>
                                    </div>
                                </div>

                                <div className={styles.ingressoFooter}>
                                    <div className={styles.valorTotal}>
                                        {formatarValor(ingresso.valor_total)}
                                    </div>
                                    <button 
                                        className={styles.detailsButton}
                                        onClick={() => console.log('Detalhes do ingresso:', ingresso.id)}
                                    >
                                        Ver Detalhes
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}