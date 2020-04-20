/// <reference types="Cypress" />


describe("Simulador de Investimento", () => {  

context("Formulário do simulador de investimento", () =>{

    beforeEach(()=>{
        cy.visit(Cypress.env('urlAplicacao'));
    })
  
    it("Testar valores na simulação de investimento", () => {

         cy.request(Cypress.env('api')).should((response) => {
            
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