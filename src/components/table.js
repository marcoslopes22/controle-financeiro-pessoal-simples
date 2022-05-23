import React, { useState, useEffect } from "react";
import deleteIcon from './img/delete-icon.png';
import './table.css';

const Main = () => {
    //Nomes.
    var [nomeCampoEntrada, setNomeCampoEntrada] = useState("Entrada");
    var [nomeCampoSaida, setNomeCampoSaida] = useState("Saída");

    //Valores.
    var [valorCampoEntrada, setValorCampoEntrada] = useState(0);
    var [valorCampoSaida, setValorCampoSaida] = useState(0);

    //Contadores.
    var [contadorEntrada, setContadorEntrada] = useState(0);
    var [contadorSaida, setContadorSaida] = useState(0);

    //Listas de entradas e saídas.
    const [camposEntrada, setCamposEntrada] = useState([]);
    const [camposSaida, setCamposSaida] = useState([]);

    //Calcular a renda total no fim do mês.
    var [rendaFimMes,setRendaFimMes] = useState([]);

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
    
    //Adicionar campos na lista de entradas.
    const adicionarCamposEntrada = () => {
        setContadorEntrada(contadorEntrada+1);
        if(nomeCampoEntrada === undefined){
            nomeCampoEntrada = `Entrada 0${contadorEntrada}`;
        };
        const campoEntradaDefault = {
            labelNameEntrada: nomeCampoEntrada,
            valorEntrada: valorCampoEntrada,
            entradaFormatada: valorCampoEntrada.toLocaleString(
                'pt-br',{style:'currency',currency:'BRL'}
            )
        };
        setCamposEntrada([...camposEntrada, campoEntradaDefault]);

        document.getElementById('input-nome-campo-entrada').value = '';
        document.getElementById('input-valor-campo-entrada').value = '';
        setNomeCampoEntrada(nomeCampoEntrada = undefined);
        setValorCampoEntrada(valorCampoEntrada = 0);
    };

    //Deletar campos na lista de entradas.
    const deletarCamposEntrada = (atributoDeletar) => {
        setContadorEntrada(contadorEntrada-1);
        const deletarEntrada = atributoDeletar.target.getAttribute('removeritensentradas');
        const filtrar = camposEntrada.filter(
            itemEntrada => itemEntrada.labelNameEntrada !== deletarEntrada
        );
        setCamposEntrada(filtrar);
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

    //Adicionar campos na lista de saídas.
    const adicionarCamposSaida = () => {
        setContadorSaida(contadorSaida+1);
        if(nomeCampoSaida === undefined){
            nomeCampoSaida = `Saída 0${contadorSaida}`;
        };
        const campoSaidaDefault = {
            labelNameSaida: nomeCampoSaida,
            valorSaida: valorCampoSaida,
            saidaFormatada: valorCampoSaida.toLocaleString(
                'pt-br',{style:'currency',currency:'BRL'}
            )
        };
        setCamposSaida([...camposSaida, campoSaidaDefault]);

        document.getElementById('input-nome-campo-saida').value = '';
        document.getElementById('input-valor-campo-saida').value = '';
        setNomeCampoSaida(nomeCampoSaida = undefined);
        setValorCampoSaida(valorCampoSaida = 0);
    };

    //Remover campos da lista de saídas.
    const deletarCamposSaida = (atributoDeletar) => {
        setContadorSaida(contadorSaida-1);
        const deletarSaida = atributoDeletar.target.getAttribute('removeritenssaidas');
        const filtrar = camposSaida.filter(
            itemSaida => itemSaida.labelNameSaida !== deletarSaida
        );
        setCamposSaida(filtrar);
    };

    //Calcular a renda total no fim do mês.
    useEffect(()=>{
        calcularRendaFimMes();
    },[camposEntrada,camposSaida]);

    const calcularRendaFimMes = () => {
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
    };

    //Retorno do componente.
    return(
        <div className="principal">
        <div className="interface-sistema">
            <h1 className="titulo-projeto">SISTEMA DE CONTROLE FINANCEIRO</h1>
            <div className="campo">
                <h2 className="nome-campo">ENTRADAS/RENDA</h2>

                <fieldset className="corpo-campo" id="fieldset-entradas">
                <div className="cabeçalho-descrição-valor">
                    <label className="descrição">Descrição</label>
                    <label className="valor">Valor</label>
                </div>
                <hr className="separador"></hr>
                <div className="apresentar-tabela">
                    {camposEntrada.map((propEntrada,index)=>(
                    <div key={index} className="retornar-formulario">
                        <label 
                            className="label-descrição"
                            id="nome-campo">
                            {propEntrada.labelNameEntrada}
                        </label>
                        <label
                            className="label-valor"
                            id="valor-campo">
                            {propEntrada.entradaFormatada}
                        </label>
                        <img
                            className="delete-icon"
                            src={deleteIcon}
                            removeritensentradas={propEntrada.labelNameEntrada}
                            onClick={deletarCamposEntrada}>
                        </img>
                    </div>
                    ))}
                </div>
                </fieldset>

                <div>
                    {camposEntrada.length > 0 && (
                        <fieldset className="total-formulario">
                        <div>
                            <label className="label-total">Total de entradas: </label>
                            {camposEntrada.map(
                            indiceEntrada=>indiceEntrada.valorEntrada).reduce(
                            (prev,curr)=>prev+curr,0).toLocaleString(
                            'pt-br',{style:'currency',currency:'BRL'})}
                        </div>
                        </fieldset>
                    )}
                </div>

                <fieldset className="adicionar-novos-campos">
                    <label className="label-novo-campo">Nova Entrada:</label>
                    <input 
                        type="text"
                        id="input-nome-campo-entrada"
                        className="inputs-adicionar"
                        placeholder="Descrição"
                        onChange={setarNomeEntrada}>
                    </input>
                    <input
                        type="text"
                        id="input-valor-campo-entrada"
                        className="inputs-adicionar"
                        placeholder="Valor"
                        onChange={setarValorEntrada}>
                    </input>
                    <button
                        className="botao-adicionar-campo"
                        onClick={adicionarCamposEntrada}>
                        ADICIONAR
                    </button><br/>
                </fieldset>
            </div>

            <div className="campo">
                <h2 className="nome-campo">SAÍDAS/DESPESAS</h2>
                <fieldset className="corpo-campo" id="fieldset-saidas">
                <div className="cabeçalho-descrição-valor">
                    <label className="descrição">Descrição</label>
                    <label className="valor">Valor</label>
                </div>
                <hr className="separador"></hr>
                <div className="apresentar-tabela">
                    {camposSaida.map((propSaida,index)=>(
                    <div key={index} className="retornar-formulario">
                        <label 
                            className="label-descrição"
                            id="nome-campo">
                            {propSaida.labelNameSaida}
                        </label>
                        <label 
                            className="label-valor"
                            id="valor-campo">
                            {propSaida.saidaFormatada}
                        </label>
                        <img
                            className="delete-icon"
                            src={deleteIcon}
                            removeritenssaidas={propSaida.labelNameSaida}
                            onClick={deletarCamposSaida}>
                        </img>
                    </div>
                    ))}
                </div>
                </fieldset>

                <div>
                    {camposSaida.length > 0 && (
                       <fieldset className="total-formulario">
                        <div>
                            <label className="label-total">Total de saídas: </label>
                            {camposSaida.map(
                            indiceSaida=>indiceSaida.valorSaida).reduce(
                            (prev,curr)=>prev+curr,0).toLocaleString(
                            'pt-br',{style:'currency',currency:'BRL'})}
                        </div>
                        </fieldset> 
                    )}
                </div>

                <fieldset className="adicionar-novos-campos">
                <label className="label-novo-campo">Nova Saída: </label>
                    <input 
                        type="text"
                        id="input-nome-campo-saida"
                        className="inputs-adicionar"
                        placeholder="Descrição"
                        onChange={setarNomeSaida}>
                    </input>
                    <input
                        type="text"
                        id="input-valor-campo-saida"
                        className="inputs-adicionar"
                        placeholder="Valor"
                        onChange={setarValorSaida}>
                    </input>
                    <button
                        className="botao-adicionar-campo"
                        onClick={adicionarCamposSaida}>
                        ADICIONAR
                    </button><br/>
                </fieldset>
            </div>

            <div className="campo">
                <fieldset className="total-renda">
                {rendaFimMes.map((propRenda,index)=>(
                <div key={index}>
                    <label className="label-total">Renda total no fim do mês: </label>
                    <label>{propRenda.valorRendaFinal}</label>
                </div>
                ))}
                </fieldset>
            </div>

            <p className="creditos">
            Desenvolvido por Marcos Aurélio Lopes de Araújo.
            </p>

        </div>
        </div>
    );
}
export default Main;