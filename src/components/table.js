import React from "react";
import './table.css';

const Main = () => {

    //Variáveis que vão armazenar os valores dos inputs "receberSalario", "receberRendaExtra".
    var receberSalario = 0;
    var receberRendaExtra = 0;
    var valorTotalReceita = 0;

    var receberAluguel = 0;
    var receberCompras = 0;
    var receberIluminacao = 0;
    var receberAgua = 0;
    var receberInternet = 0;
    var receberLazer = 0;

    var custoTotalDespesas = 0;
    var descontarSalario = 0;

    //Métodos para atribuir os valores nas devidas variáveis da receita.
    const inputSalario = (salario) => {
        receberSalario = parseFloat(salario.target.value);
        if(isNaN(receberSalario)){receberSalario = 0};
        calcularValorTotal();
        descontarDespesas();
    };
    const inputRendaExtra = (rendaExtra) => {
        receberRendaExtra = parseFloat(rendaExtra.target.value);
        if(isNaN(receberRendaExtra)){receberRendaExtra = 0};
        calcularValorTotal();
        descontarDespesas();
    };

    //Método que vai calcular o valor total das receitas.
    const calcularValorTotal = () => {
        valorTotalReceita = receberSalario + receberRendaExtra;
        var formatarReceita = valorTotalReceita.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        document.getElementById("receber").innerHTML = formatarReceita;
    };

    //Métodos para atribuir os valores nas devidas variáveis da despesa.
    const inputAluguel = (aluguel) => {
        receberAluguel = parseFloat(aluguel.target.value);
        if(isNaN(receberAluguel)){receberAluguel = 0};
        descontarDespesas();
    };
    const inputCompras = (compras) => {
        receberCompras = parseFloat(compras.target.value);
        if(isNaN(receberCompras)){receberCompras = 0};
        descontarDespesas();
    };
    const inputIluminacao = (iluminacao) => {
        receberIluminacao = parseFloat(iluminacao.target.value);
        if(isNaN(receberIluminacao)){receberIluminacao = 0};
        descontarDespesas();
    };
    const inputAgua = (agua) => {
        receberAgua = parseFloat(agua.target.value);
        if(isNaN(receberAgua)){receberAgua = 0};
        descontarDespesas();
    };
    const inputInternet = (internet) => {
        receberInternet = parseFloat(internet.target.value);
        if(isNaN(receberInternet)){receberInternet = 0};
        descontarDespesas();
    };
    const inputLazer = (lazer) => {
        receberLazer = parseFloat(lazer.target.value);
        if(isNaN(receberLazer)){receberLazer = 0};
        descontarDespesas();
    };

    //Método para subtrair as despesas do salário.
    const descontarDespesas = () => {
        custoTotalDespesas = (receberAluguel + receberCompras + receberIluminacao + receberAgua + receberLazer + receberInternet);
        descontarSalario = valorTotalReceita - custoTotalDespesas;
        var formatarReceitaFimMes = descontarSalario.toLocaleString('pt-br',{style:'currency',currency: 'BRL'});
        document.getElementById("receber-despesas").innerHTML = formatarReceitaFimMes;
    };

    //Retorno do componente.
    return(
        <div className="main">
            <div className="interface-system">
                <h1>SISTEMA FINANCEIRO PESSOAL</h1>
                <div className="primeiro-campo">
                    <h2>RECEITAS</h2>
                    <fieldset className="receitas">
                        <label htmlFor="input-salario">Salário</label>
                        <input type="text" id="input-salario" onChange = {inputSalario}/><br/>
                        <label htmlFor="input-renda-extra">Renda Extra</label>
                        <input type="text" id="input-renda-extra" onChange = {inputRendaExtra}/><br/>
                    </fieldset>

                    <fieldset className="total-receita">
                        <label>
                        Receita total: <label id="receber">R$ 0,00</label>
                        </label>
                    </fieldset>
                </div>

                <div className="segundo-campo">
                    <h2>DESPESAS</h2>
                    <fieldset className="despesas">
                        <label htmlFor="aluguel" >Aluguel</label>
                        <input type="text" id="aluguel" onChange = {inputAluguel}/><br/>
                        <label htmlFor="compras" >Compras</label>
                        <input type="text" id="compras" onChange = {inputCompras}/><br/>
                        <label htmlFor="iluminacao" >Iluminação</label>
                        <input type="text" id="iluminacao" onChange = {inputIluminacao}/><br/>
                        <label htmlFor="agua" >Água</label>
                        <input type="text" id="agua" onChange = {inputAgua}/><br/>
                        <label htmlFor="internet" >Internet</label>
                        <input type="text" id="internet" onChange = {inputInternet}/><br/>
                        <label htmlFor="lazer" >Lazer</label>
                        <input type="text" id="lazer" onChange = {inputLazer}/><br/>
                    </fieldset>
             
                    <fieldset className="receita-fim-mes">
                        <label>
                        Receita no fim do mês: <label id="receber-despesas">R$ 0,00</label>
                        </label>
                    </fieldset>
                </div>
                <p className="creditos">
                    Desenvolvido por Marcos Aurélio Lopes de Araújo
                </p>
            </div>
        </div>
    );
}
export default Main;