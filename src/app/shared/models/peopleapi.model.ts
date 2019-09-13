export namespace PeopleApi {
    export enum InvestorStatus {
        Incompleto = 0,
        ConclusaoEmAndamento = 1,
        PendenteEnvioBureau = 2,
        PendenteRetornoBureau = 3,
        AprovadoAutomaticamente = 4,
        ReprovadoAutomaticamente = 5,
        PendenteDocumento = 6,
        PendenteAnaliseDocumento = 7,
        DocumentoReprovado = 8,
        PendenteEnvioSinacor = 9,
        PendenteRetornoSinacor = 10,
        CriadoSinacor = 11,
        ContaHbCriada = 12,
        IntegradoLegado = 13
    }

    export const InvestorStatusDescription = new Map<number, string>([
        [InvestorStatus.Incompleto, 'Prospect'],
        [InvestorStatus.ConclusaoEmAndamento, 'Conclusão em Andamento'],
        [InvestorStatus.PendenteEnvioBureau, 'Pendente Envio Bureau'],
        [InvestorStatus.PendenteRetornoBureau, 'Pendente Retorno Bureau'],
        [InvestorStatus.AprovadoAutomaticamente, 'Aprovado Automaticamente Bureau'],
        [InvestorStatus.ReprovadoAutomaticamente, 'Reprovado Automaticamente Bureau'],
        [InvestorStatus.PendenteDocumento, 'Pendente Documento'],
        [InvestorStatus.PendenteAnaliseDocumento, 'Pendente Análise Documento'],
        [InvestorStatus.DocumentoReprovado, 'Documento Reprovado'],
        [InvestorStatus.PendenteEnvioSinacor, 'Pendente Envio Sinacor'],
        [InvestorStatus.PendenteRetornoSinacor, 'Pendente Retorno Sinacor'],
        [InvestorStatus.CriadoSinacor, 'Conta Criada Sinacor'],
        [InvestorStatus.ContaHbCriada, 'Conta HB Criada'],
        [InvestorStatus.IntegradoLegado, 'Integrado com Legado']

    ]);

    export class SinacorAccounts {
        numero: string;
        digito: string;
        dataAbertura: string;
        dataExpiracao: string;
    }

    export class PeopleList {
        pessoaId: string;
        cpf: string;
        nome: string;
        dataUltimaModificacao: Date;
        status: InvestorStatus;
        contasSinacor: SinacorAccounts[];
    }

    export class PersonListViewModel extends PeopleList {
        formattedDate: string;
        formattedStatus: string;
        formattedCpf: string;
        formattedSinacorAccount: string;
        contasSinacor: any[];

        constructor(peopleList: PeopleList) {
            super();
            this.formattedDate = new Date(peopleList.dataUltimaModificacao).toLocaleDateString('pt-BR');
            this.formattedStatus = InvestorStatusDescription.get(peopleList.status);
            this.formattedCpf = peopleList.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
            this.cpf = peopleList.cpf;
            this.pessoaId = peopleList.pessoaId;
            this.nome = peopleList.nome;
            this.dataUltimaModificacao = peopleList.dataUltimaModificacao;
            this.status = peopleList.status;
            this.formattedSinacorAccount = peopleList.contasSinacor.map(c => `${c.numero}-${c.digito}`).join('; ');
            this.contasSinacor = peopleList.contasSinacor.map(x => ({ numero: `${x.numero}-${x.digito}`, dataExpiracao: new Date(x.dataExpiracao).toLocaleDateString('pt-BR') }));
        }
    }


    export class PeopleFilterModel {
        pessoaId: string;
        cpf: string;
        textoLivre: string;
        dataUltimaModificacaoInicial: Date;
        dataUltimaModificacaoFinal: Date;
        status: number;
        numeroConta: string;
        numeroCliente: string;
    }
}
