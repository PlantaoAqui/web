import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '../../../components/Button';

interface TermosProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const useStyles = makeStyles(theme =>
    createStyles({
        termos: {
            height: '40vh',
            overflowX: 'hidden',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                width: theme.spacing(1.5)
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.grey[500],
                borderRadius: theme.spacing(2),
                '&:hover': {
                    backgroundColor: theme.palette.grey[600]
                }
            },
            marginBottom: theme.spacing(4),
            '& h1': {
                marginBottom: theme.spacing(4),
                lineHeight: '2rem'
            },
            '& p': {
                textAlign: 'justify',
                padding: theme.spacing(2)
            },
            '& ol': {
                counterReset: 'item',
                '& > li': {
                    display: 'block',
                    '& ol > li': {
                        padding: theme.spacing(2),
                        '&:before': {
                            content: 'counters(item, ".") ". "',
                            counterIncrement: 'item'
                        }
                    }
                }
            },
            '& h2': {
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(1),
                '&:before': {
                    content: 'counters(item, ".") ". "',
                    counterIncrement: 'item'
                }
            },
            '& ul li': {
                padding: theme.spacing(2),
                listStyle: 'inside'
            }
        }
    })
);

function Termos({ handleSubmit }: TermosProps) {
    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.termos}>
                <h1>Termos de uso <i>Plantão Fácil</i></h1>
                <p>É muito importante para o <i>Plantão Fácil</i> que os usuários entendam como funciona a plataforma antes que comecem a utilizá-la para as diversas aplicações disponíveis.
                    Assim, estes Termos de Uso regem o acesso e utilização das plataformas <i>Plantão Fácil</i>, quais sejam, site, e-mails e aplicativos móveis.
                    Caso esteja utilizando o <i>Plantão Fácil</i> em nome de uma pessoa jurídica, a expressão “você”  também significará essa empresa ou entidade legal.
                    Os termos  “nós” e “nos” se referem a: “<i>Plantão Fácil</i>”.
                </p>
                <ol type="1">
                    <li>
                        <h2><strong>Adesão</strong></h2>
                        <ol>
                            <li>No momento do cadastro, você deverá ler, compreender e aceitar estes Termos de Uso, conforme opção específica que será fornecida. </li>
                            <li>Ao acessar e usar o “PlantãoFácil”, você concorda com a versão dos Termos de Uso publicada no momento do acesso.</li>
                            <li>Caso não concorde com os Termos de Uso, você deverá deixar de usar a plataforma e de realizar o seu cadastro. </li>
                            <li>Este documento tem natureza de contrato de adesão e passa por revisões periódicas, sem que seja necessária a sua notificação prévia. Por isso, é importante que você consulte, periodicamente, os Termos de Uso para se certificar de que continua em plena concordância com as condições de uso.</li>
                        </ol>
                    </li>
                    <li>
                        <h2><strong>Elegibilidade de uso do <i>“PlantãoFácil”</i></strong></h2>
                        <ol>
                            <li>Para acessar ou usar o “PlantãoFácil” é necessário que a pessoa física tenha pelo menos 16 anos de idade ou a idade mínima de maioridade em sua jurisdição e esteja em pleno gozo de sua capacidade para praticar atos na vida civil;</li>
                            <li>As pessoas jurídicas e seus agentes autorizados podem usar a conta empresarial e quaisquer dados sobre a empresa fornecidos por meio dessa conta para fins de negócios internos da empresa. Exceto conforme definido acima ou aprovado por nós, o “PlantãoFácil” é para seu uso pessoal não comercial, a menos que você firme um contrato separado conosco para seu uso comercial. </li>
                            <li>Você não poderá usar o “PlantãoFácil” se tivermos encerrado ou banido sua conta.</li>
                        </ol>
                    </li>
                    <li>
                        <h2><strong>Sua conta do <i>“PlantãoFácil”</i></strong></h2>
                        <ol>
                            <li>Para criar uma conta no ““PlantãoFácil”” é necessário fornecer um endereço de e mail válido e um número de cadastro ativo em um dos 27 Conselhos Regionais de Medicina das unidades federativas brasileiras.</li>
                            <li>Se não for possível o contato através do e-mail fornecido, o “PlantãoFácil” pode rejeitar o seu conteúdo e desativar a sua conta.</li>
                            <li>Outros requisitos de inscrição (como cliques em links em e mails de alerta de vagas do “PlantãoFácil” por usuários não inscritos que criam alertas de vagas ou para os indivíduos contribuírem com apenas uma avaliação de empresa, avaliação de entrevista e/ou detalhes de salário de um emprego atual ou antigo por ano) também podem se aplicar.</li>
                            <li>Ao se cadastrar no “PlantãoFácil” você registrará uma senha e reconhece, desde já, que a sua senha de acesso é de uso pessoal e intransferível, não podendo fornecê-la a terceiros sob nenhuma hipótese.</li>
                            <li>Você deverá adotar todas as providências necessárias para garantir a confidencialidade e sigilo de sua senha.</li>
                            <li>Você concorda em avisar o “PlantãoFácil” sempre que suspeitar de qualquer uso não autorizado da sua conta ou acesso indevido à sua senha. Você é exclusivamente responsável por todo e qualquer uso de sua conta.</li>
                            <li>Você também se compromete a responder integralmente por quaisquer consequências jurídicas decorrentes diretamente da perda ou extravio de sua senha, caso você haja com imprudência, negligência ou imperícia.</li>
                            <li>As senhas estão sujeitas ao cancelamento ou suspensão pelo “PlantãoFácil” a qualquer momento.</li>
                            <li>Ao configurar uma conta de usuário individual no ““PlantãoFácil””, será criado um perfil de membro (“Perfil”) que conterá todas as informações pessoais que você inseriu.</li>
                            <li>Atualizaremos o seu “Perfil” com as informações coletadas nos currículos carregados no ““PlantãoFácil””.</li>
                        </ol>
                    </li>
                    <li>
                        <h2><strong>Como usar o <i>“PlantãoFácil”</i></strong></h2>
                        <ol>
                            <li><strong>Disponibilização de Conteúdo.</strong> O “PlantãoFácil” disponibiliza conteúdos de outros usuários, anunciantes e terceiros. </li>
                            <li>Por “Conteúdo” entende-se quaisquer informações sobre salários, avaliações de empresas, avaliações de entrevistas, fotos de empresas, logotipos, respostas de empresas, vagas patrocinadas, informações de perfil de empresas, anúncios, comentários, opiniões, publicações, currículos, mensagens, textos, arquivos, imagens, fotos, redações, e mails, dados e outros materiais que você encontrar no ““PlantãoFácil””.</li>
                            <li>
                                O “PlantãoFácil” não controla e não se responsabiliza por tal Conteúdo, sendo certo que você entende e concorda que:
                                <ol>
                                    <li>O “PlantãoFácil” não endossa e/ou se responsabiliza pelo Conteúdo de terceiros, incluindo publicidade e informações de produtos e serviços de terceiros, vagas patrocinadas ou informações relacionadas a empresas, entrevistas e salários informações fornecidas por outros usuários;</li>
                                    <li>O “PlantãoFácil” não garante a exatidão, atualização, adequação, confiabilidade ou qualidade das informações do Conteúdo de terceiros ; e</li>
                                    <li>O “PlantãoFácil” não se responsabiliza por Conteúdo não intencional, questionável, impreciso, enganoso ou ilegal disponibilizado pelos usuários, anunciantes e terceiros.</li>
                                </ol>
                            </li>
                            <li>O “PlantãoFácil” permite que os usuários publiquem conteúdos sobre empresas nas quais tenham sido funcionários em tempo integral ou meio período, como prestador de serviços, freelancer ou funcionário independente, ou tenham fornecido trabalho como parte integrante da cadeia de valor da empresa.</li>
                            <li>Também permite que os usuários avaliem as agências de recrutamento responsáveis pela sua colocação.</li>
                            <li>Com relação ao Conteúdo fornecido no “PlantãoFácil”, todos os trabalhadores são considerados como “funcionários”. Embora os avaliadores possam especificar a categoria da contratação ao deixarem uma avaliação (por exemplo, prestador de serviços, freelancer, etc.), essa não é uma exigência. Se um trabalhador, em qualquer uma dessas funções, deixar uma avaliação como  “funcionário”, ele não violará nossas Regras da comunidade ou estes Termos.</li>
                            <li>Você declara e garante que usará o “PlantãoFácil”, exclusivamente, para fins lícitos, em conformidade com estes Termos e com todas as leis e regulamentos jurídicos vigentes (inclusive obrigações contratuais) que possa ter conosco e com quaisquer terceiros.</li>
                            <li>Você é exclusivamente responsável por todo e qualquer Conteúdo publicado pela sua conta no ““PlantãoFácil”” ( “Seu conteúdo”).</li>
                            <li>
                                Você concorda que, ao enviar ou autorizando o uso do “Seu conteúdo” pelo “PlantãoFácil”, analisou e entendeu nossas Regras da comunidade. Você entende que pode ser responsabilizado caso “Seu conteúdo” ou qualquer uso do “PlantãoFácil” viole a lei vigente ou qualquer direito de terceiros.
                                <br /><br />
                                Você concorda em não:
                                <ul>
                                    <li>Se passar por outra pessoa, usar o endereço de e mail dela ou deturpar sua afiliação atual ou antiga com uma empresa;</li>
                                    <li>Criar contas de usuário sob representação falsa ou fraudulenta, criar ou usar uma conta para outra pessoa, ou criar várias contas de usuário ativo para publicar várias avaliações para a mesma empresa;</li>
                                    <li>Publicar Conteúdo que não for de sua propriedade ou que você não tiver o direito de publicar de acordo com a licença prevista nestes Termos;</li>
                                </ul>
                            </li>
                        </ol>
                    </li>
                </ol>
            </div>
            <Button
                background='#FF817C'
                type="submit"
                texto="Li e aceito os termos"
                textTransform="none"
            />
        </form>
    );
}

export default Termos;
