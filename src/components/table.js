import React, { useState, useEffect } from "react";
import deleteIcon from './img/delete-icon.png';
import './table.css';

const Main = () => {

    //Acessar o banco de dados de entradas e saídas.
    const getLocalStorageEntrada = () => JSON.parse(localStorage.getItem("db_entradas")) ?? [];
    const setLocalStorageEntrada = (addEntrada) => localStorage.setItem("db_entradas", JSON.stringify(addEntrada));
    const getLocalStorageSaida = () => JSON.parse(localStorage.getItem("db_saidas")) ?? [];
    const setLocalStorageSaida = (addSaidas) => localStorage.setItem("db_saidas", JSON.stringify(addSaidas));

    //Ids necessários dos intpus de adcionar valor.
    var inputEntrada = document.getElementById("input-name-entry");
    var inputValorEntrada = document.getElementById("input-value-entry");
    var inputSaida = document.getElementById("input-name-output");
    var inputValorSaida = document.getElementById("input-value-output");

    var idMensagemEntrada = document.getElementById("entry-warning");
    var idMensagemSaida = document.getElementById("output-warning");

    //Nomes.
    var [nomeCampoEntrada, setNomeCampoEntrada] = useState(undefined);
    var [nomeCampoSaida, setNomeCampoSaida] = useState(undefined);

    //Valores.
    var [valorCampoEntrada, setValorCampoEntrada] = useState(0);
    var [valorCampoSaida, setValorCampoSaida] = useState(0);

    //Listas de entradas e saídas.
    const [camposEntrada, setCamposEntrada] = useState([]);
    const [camposSaida, setCamposSaida] = useState([]);

    //Calcular a renda total no fim do mês.
    var [rendaFimMes, setRendaFimMes] = useState([]);

    //Coletar o nome e o valor dos campos de entradas.
    function setarNomeEntrada(nomeInput){
        setNomeCampoEntrada(
            nomeCampoEntrada = nomeInput.target.value
        );
    };
    function setarValorEntrada(valorInput){
        setValorCampoEntrada(
            valorCampoEntrada = parseFloat(valorInput.target.value)
        );
    };
    
    //Acessar dados do localstorage de entradas e saídas.
    const acessarBancoEntrada = useEffect(()=>{
        setCamposEntrada(getLocalStorageEntrada);
    },[]);
    const acessarBancoSaida = useEffect(()=>{
        setCamposSaida(getLocalStorageSaida);
    },[]);

    //ENTRADAS
    //Adicionar campos na lista de entradas.
    const adicionarCamposEntrada = () => {
        if(nomeCampoEntrada === "" || nomeCampoEntrada === undefined){
            
            if(valorCampoEntrada === 0 || isNaN(valorCampoEntrada)){
                idMensagemEntrada.innerText = "Insira um nome e um valor nos campos de entrada!";
                idMensagemEntrada.style.color = 'rgb(235, 101, 24)';

            } else if (valorCampoEntrada !== 0 || isNaN(valorCampoEntrada) === false){
                idMensagemEntrada.innerText = "Insira um nome no campo de entrada!";
                idMensagemEntrada.style.color = 'rgb(235, 101, 24)';
            };

        } else if (nomeCampoEntrada !== "" || nomeCampoEntrada !== undefined){

            if(valorCampoEntrada === 0 || isNaN(valorCampoEntrada)){
                idMensagemEntrada.innerText = "Insira um valor no campo de entrada.";
                idMensagemEntrada.style.color = 'rgb(235, 101, 24)';
                
            } else if (valorCampoEntrada !== 0 || isNaN(valorCampoEntrada) === false){
                const campoEntradaDefault = {
                    labelNameEntrada: nomeCampoEntrada,
                    valorEntrada: valorCampoEntrada,
                    entradaFormatada: valorCampoEntrada.toLocaleString(
                        'pt-br',{style:'currency',currency:'BRL'}
                    )
                };
                const getDBEntrada = getLocalStorageEntrada();
                getDBEntrada.push(campoEntradaDefault);
                setLocalStorageEntrada(getDBEntrada);
                setCamposEntrada([...camposEntrada, campoEntradaDefault]);
        
                limparCamposEntrada();
            };
        };
    };

    //Limpar campos de entrada.
    const limparCamposEntrada = () => {
        inputEntrada.value = '';
        inputValorEntrada.value = '';
        setNomeCampoEntrada(nomeCampoEntrada = undefined);
        setValorCampoEntrada(valorCampoEntrada = 0);
    };

    //Deletar campos na lista de entradas.
    const deletarCamposEntrada = (indiceEntrada) => {
        const getDBEntrada = getLocalStorageEntrada();
        getDBEntrada.splice(indiceEntrada, 1);
        setLocalStorageEntrada(getDBEntrada);

        setCamposEntrada(getLocalStorageEntrada);
    };
    const buscarIndiceEntrada = (indiceBotaoDeletar) => {
        const idBotao = indiceBotaoDeletar.target.id;
        deletarCamposEntrada(idBotao);
    };

    //Coletar o nome e o valor dos campos de saídas.
    function setarNomeSaida(nomeInput){
        setNomeCampoSaida(
            nomeCampoSaida = nomeInput.target.value
        );
    };
    function setarValorSaida(valorInput){
        setValorCampoSaida(
            valorCampoSaida = parseFloat(valorInput.target.value)
        );
    };

    //SAÍDAS
    //Adicionar campos na lista de saídas.
    const adicionarCamposSaida = () => {
        if(nomeCampoSaida === "" || nomeCampoSaida === undefined){
            
            if(valorCampoSaida === 0 || isNaN(valorCampoSaida)){
                idMensagemSaida.innerText = "Insira um nome e um valor nos campos de saída!";
                idMensagemSaida.style.color = 'rgb(235, 101, 24)';

            } else if (valorCampoSaida !== 0 || isNaN(valorCampoSaida) === false){
                idMensagemSaida.innerText = "Insira um nome no campo de saída!";
                idMensagemSaida.style.color = 'rgb(235, 101, 24)';
                
            };

        } else if (nomeCampoSaida !== "" || nomeCampoSaida !== undefined){

            if(valorCampoSaida === 0 || isNaN(valorCampoSaida)){
                idMensagemSaida.innerText = "Insira um valor no campo de saída.";
                idMensagemSaida.style.color = 'rgb(235, 101, 24)';
                
            } else if (valorCampoSaida !== 0 || isNaN(valorCampoSaida) === false){
                const campoSaidaDefault = {
                    labelNameSaida: nomeCampoSaida,
                    valorSaida: valorCampoSaida,
                    saidaFormatada: valorCampoSaida.toLocaleString(
                        'pt-br',{style:'currency',currency:'BRL'}
                    )
                };
                const getDBSaida = getLocalStorageSaida();
                getDBSaida.push(campoSaidaDefault);
                setLocalStorageSaida(getDBSaida);
                setCamposSaida([...camposSaida, campoSaidaDefault]);
        
                limparCamposSaida();
            };
        };
    };

    //Limpar campos saida.
    const limparCamposSaida = () => {
        inputSaida.value = '';
        inputValorSaida.value = '';
        setNomeCampoSaida(nomeCampoSaida = undefined);
        setValorCampoSaida(valorCampoSaida = 0);
    };
    //Remover campos da lista de saídas.
    const deletarCamposSaida = (indiceSaida) => {
        const getDBSaida = getLocalStorageSaida();
        getDBSaida.splice(indiceSaida,1);
        setLocalStorageSaida(getDBSaida);

        setCamposSaida(getLocalStorageSaida);
    };
    const buscarIndiceSaida = (indiceBotaoSaida) => {
        const idBotao = indiceBotaoSaida.target.id;
        deletarCamposSaida(idBotao);
    };

    //Calcular a renda total no fim do mês.
    const calcularRendaFimMês = useEffect(()=>{
        var totalEntradas = camposEntrada.map(
            itemEntrada => itemEntrada.valorEntrada).reduce(
                (entradaAnt,EntradaAtual)=>entradaAnt + EntradaAtual, 0);
        var totalSaidas = camposSaida.map(
            itemSaida => itemSaida.valorSaida).reduce(
                (saidaAnt,saidaAtual)=>saidaAnt + saidaAtual, 0);
        var rendaTotalFimMes = (totalEntradas - totalSaidas).toLocaleString(
                'pt-br',{style:'currency',currency:'BRL'});
        const atribuirRenda = {
                valorRendaFinal: rendaTotalFimMes
        };
        setRendaFimMes([atribuirRenda]);
    },[camposEntrada,camposSaida]);

    //Retorno do componente.
    return(
        <div className="main">
            <div className="project-name">
            <h1>CONTROLE FINANCEIRO</h1>
            </div>
    {/* --------------------------------------------------------------------------------- ENTRY-CAMPS */}
            <div className="entry-camp">
                <div className="camp-name"><h2>Entradas</h2></div>
                <div className="description-and-value-labels">
                <label className="description">Descrição</label>
                <label className="value">Valor</label>
                </div>
                <fieldset className="fieldset-condition" id="fieldset-entry">
                {camposEntrada.length > 0 ? (
                    <div className="map-list">
                    {camposEntrada.map(( propEntrada, id )=>(
                    <div key={ id } className="show-list">
                    <label className="label-description" id="description">{ propEntrada.labelNameEntrada }</label>
                    <label className="label-value" id="value">{ propEntrada.entradaFormatada }</label>
                    <img className="delete-icon" src={ deleteIcon } id={ id } onClick={ buscarIndiceEntrada }></img>
                    </div>
                    ))}
                    </div>
                ):( <div className="empty-camps-messenger"><label>Você ainda não adicionou entradas. Clique em "Nova Entrada" para adicionar.</label></div>)}
                </fieldset>
                <div className="condition-total">
                {camposEntrada.length > 0 && (
                    <div className="total-list">
                    <div className="show-total"><label className="total-label">Total de entradas:</label>&nbsp;
                    {camposEntrada.map(indiceEntrada => indiceEntrada.valorEntrada).reduce(
                    (prev,curr)=>prev+curr,0).toLocaleString('pt-br',{style:'currency',currency:'BRL'})}
                    </div>
                    </div>
                    )}
                </div>
            </div>
            <hr className="division"></hr>
                <fieldset className="add-new-camps">
                    <input 
                    type="text" id="input-name-entry" className="add-input" placeholder="Descrição"
                    onChange={ setarNomeEntrada }
                    onClick={()=>{ idMensagemEntrada.style.color = 'transparent' } }></input>
                    <input type="text" id="input-value-entry" className="add-input" placeholder="Valor"
                    onChange={ setarValorEntrada }
                    onClick={()=>{idMensagemEntrada.style.color = 'transparent'} }></input>
                    <button className="add-camps-button" onClick={ adicionarCamposEntrada }>
                    NOVA ENTRADA
                    </button><br/>
                </fieldset>
                <div className="div-warning">
                <label className="warning-label" id="entry-warning" style={ {display: "block", color: "transparent"} }>empty</label>
            </div>
    {/* --------------------------------------------------------------------------------- ENTRY-CAMPS */}
    {/* --------------------------------------------------------------------------------- OUTPUT-CAMPS */}
            <div className="output-camp">
                <div className="camp-name"><h2>Saídas</h2></div>
                <div className="description-and-value-labels">
                <label className="description">Descrição</label>
                <label className="value">Valor</label>
                </div>
                <fieldset className="fieldset-condition" id="fieldset-output">
                {camposSaida.length > 0 ? (
                    <div className="map-list">
                    {camposSaida.map(( propSaida, id )=>(
                    <div key={ id } className="show-list">
                    <label className="label-description" id="description">{ propSaida.labelNameSaida }</label>
                    <label className="label-value" id="value">{ propSaida.saidaFormatada }</label>
                    <img style={{maxWidth: "13px"}} className="delete-icon" src={ deleteIcon } id={ id } onClick={ buscarIndiceSaida }></img>
                    </div>
                    ))}
                    </div>
                ):( <div className="empty-camps-messenger"><label>Você ainda não adicionou saídas. Clique em "Nova Saída" para adicionar.</label></div>)}
                </fieldset>
                <div className="condition-total">
                {camposSaida.length > 0 && (
                    <fieldset className="total-list">
                    <div className="show-total"><label className="total-label">Total de saídas:</label>&nbsp;
                    {camposSaida.map(indiceSaida => indiceSaida.valorSaida).reduce(
                    (prev,curr)=>prev+curr,0).toLocaleString('pt-br',{style:'currency',currency:'BRL'})}
                    </div>
                    </fieldset>
                    )}
                </div>
            </div>
            <hr className="division"></hr>
                <fieldset className="add-new-camps">
                    <input 
                    type="text" id="input-name-output" className="add-input" placeholder="Descrição"
                    onChange={ setarNomeSaida }
                    onClick={()=>{ idMensagemSaida.style.color = 'transparent' } }></input>
                    <input type="text" id="input-value-output" className="add-input" placeholder="Valor"
                    onChange={ setarValorSaida }
                    onClick={()=>{idMensagemSaida.style.color = 'transparent'} }></input>
                    <button className="add-camps-button" onClick={ adicionarCamposSaida }>
                    NOVA SAÍDA
                    </button><br/>
                </fieldset>
                <div className="div-warning">
                <label className="warning-label" id="output-warning" style={ {display: "block", color: "transparent"} }>empty</label>
                </div>
    {/* --------------------------------------------------------------------------------- OUTPUT-CAMPS */}

                <div className="total-income-camp">
                    <fieldset className="map-total-income">
                    {rendaFimMes.map((  propRenda, id )=>(
                        <div key={ id }>
                        <label className="label-total">Total no fim do mês:</label>&nbsp;
                        <label>{ propRenda.valorRendaFinal }</label>
                        </div>
                    ))}
                    </fieldset>
                </div>
                <p className="credits">Desenvolvido por Marcos Aurélio Lopes de Araújo.</p>
        </div>
    );
}
export default Main;