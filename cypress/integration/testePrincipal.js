/// <reference types="Cypress" />


describe("Simulador de Investimento", () => {  

 

context("Formulário do simulador de investimento", () =>{

    beforeEach(()=>{
        cy.visit("https://www.sicredi.com.br/html/ferramenta/simulador-investimento-poupanca/");
    })
  
    it("Testar valores na simulação de investimento", () => {

         cy.request('http://5b847b30db24a100142dce1b.mockapi.io/api/v1/simulador').should((response) => {
            
            var meses = response.body.meses;
            var valores = response.body.valor;

            console.log(meses);
            console.log(valores);

            meses.forEach(mes => {
               valores.forEach(valor => { 

                  cy.get("#valorAplicar").type(valor);
                  cy.get("#valorInvestir").type(valor);
                  cy.get("#tempo").type(mes);
                  cy.get(".simular > .btn").click();
                  
                  
                  cy.get(".blocoResultadoSimulacao > .texto").should('have.text', 'Em ' + mes + ' meses você terá guardado');
                  cy.reload();
                })
            });
        })  
    })

    it("Testar valor zerado no formulario", ()=> {
        
        cy.get("#valorAplicar").type("00,00");
        cy.get("#valorInvestir").type("00,00");
        cy.get("#tempo").type("12");
        cy.get(".simular > .btn").click();
        cy.get("#valorAplicar-error").should('be.visible');
    })
})

})