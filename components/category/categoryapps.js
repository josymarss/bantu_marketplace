import React from 'react';
import AppCard from '../Appcard/appcard';
import styles from './categoryapps.module.css'

const Categoryapps = ({category}) => {
    const 
            {   Servicos,
                Bate_papo_ou_chat,
                Informacoes,
                Comunicacao,
                Midia_social,
                Navegador_web,
                Correio_eletronico,
                Desenvolvimento_de_aplicacoes,
                Telefonia_e_videoconferencia,
                Desenho_industrial_3D_ou_edicao,
                Administracao_publica_e_de_Processo_eletronico    
            } = category;

    const verifyArray  = (arr) => {
         return (arr === undefined || arr.length ===0)
    }
    const CategoryApp = ({arr}) => {
        return( <div className={styles.containerApp}>
            {
               verifyArray(arr)? '': arr.map((elem)=> <AppCard app={elem} />)
            }
        </div>
    )}
    return (
        <div className={styles.container}>
            <h2>Categorias</h2>
            <nav className={styles.categoryMenu}>
                    <ul>
                        <li>
                            <a href='#servico'>Serviços</a>
                        </li>
                        <li>
                            <a href='#informacoes'>Informações</a>
                        </li>
                        <li><a href='#comunicacao'>Comunicação</a></li>
                        <li>
                            <a href='#midia_social'>Mídia Social</a>
                        </li>
                        <li>
                            <a href='#navegador_web'>Navegador web</a>
                        </li>
                        <li>
                            <a href='#correio_eletronico'>Correio eletrônico</a>
                        </li>
                        <li>
                            <a href='#desenvolvimento_de_aplicacoes'>Desenvolvimento <br/> de aplicações</a>
                        </li>
                        <li>
                            <a href='#telefonia_e_videoconferencia'>Telefonia e videoconferência</a>
                        </li>
                        <li>
                            <a href='#Desenho_industrial_3D_ou_edicao'>Desenho industrial <br/> 3D ou edição</a>
                        </li>
                        <li>
                            <a href='#administracao_publica_e_de_Processo_eletronico'>Administração Pública <br/> e de Processo eletrônico</a>
                        </li>
                    </ul>
            </nav>
            {verifyArray(Servicos) ? '' : <h3 id="servico">Serviços</h3>}
            <CategoryApp arr={Servicos} />

            {verifyArray(Informacoes)? '' : <h3 id="informacoes">Informações</h3>}
            <CategoryApp arr={Informacoes}/>
            
            {verifyArray(Comunicacao)? '' : <h3 id="comunicacao">Comunicação</h3>}
            <CategoryApp arr={Comunicacao} />

            {verifyArray(Midia_social)? '' : <h3 id="midia_social">Mídia Social</h3>}
            <CategoryApp arr={Midia_social} />

            {verifyArray(Navegador_web)? '' : <h3 id="navegador_web">Navegador web</h3>}
            <CategoryApp arr={Navegador_web} />

            {verifyArray(Correio_eletronico)? '' : <h3 id="correio_eletronico">Correio eletrônico</h3>}
            <CategoryApp  arr={Correio_eletronico}/>

            {verifyArray(Desenvolvimento_de_aplicacoes)? '' : <h3 id="desenvolvimento_de_aplicacoes">Desenvolvimento de aplicações</h3>}
             <CategoryApp arr={Desenvolvimento_de_aplicacoes} />

            {verifyArray(Telefonia_e_videoconferencia) ? '' : <h3 id="telefonia_e_videoconferencia">Telefonia e videoconferência</h3>}
            <CategoryApp arr={Telefonia_e_videoconferencia} /> 

            {verifyArray(Desenho_industrial_3D_ou_edicao)? '' : <h3 id="Desenho_industrial_3D_ou_edicao">Desenho industrial, 3D ou edição</h3>}
            <CategoryApp arr={Desenho_industrial_3D_ou_edicao} />

            {verifyArray(Administracao_publica_e_de_Processo_eletronico)? '' : <h3 id="administracao_publica_e_de_Processo_eletronico">Administração Pública e de Processo eletrônico</h3>}
            <CategoryApp arr= {Administracao_publica_e_de_Processo_eletronico}/>
        </div>
    );
}

export default Categoryapps;
