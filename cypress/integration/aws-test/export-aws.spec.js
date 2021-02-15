import enterCredentialsCognitoS3 from "../utils/credentials-test/enter-credentials-cognito-s3"
import enterCredentialsUser from "../utils/credentials-test/enter-credentials-user"
import setLanguage from "../utils/set-language"
import goToImportPage from "../utils/go-to-import-page"
import removeAWSFile from "../utils/remove-cypress-file-in-aws"
describe("aws test", () => {
  before("Prepare tests", () => {
    cy.log("should be able to join the web site")
    cy.visit(`http://localhost:6001`)
    cy.wait(400)
    /*setLanguage()
    enterCredentialsCognitoS3()
    enterCredentialsUser()
    goToImportPage()*/
  })

  it("Try to export a natif project to aws", () => {
    cy.log("RECORD_KEY")
    cy.log(Cypress.env("SOME_VAR"))
    cy.log("CYPRESS_RECORD_KEY")
    cy.log(Cypress.env("CYPRESS_SOME_VAR"))
    cy.log("should be able to use export project")
    cy.wait(200)
    cy.contains("Export to S3 (Cognito)").click()
    cy.get("input[id='ProjectName']")
      .clear()
      .type("CypressTest1")
      .type("{enter}")
    cy.contains("Create Project").click()

    cy.log("should be able to see the new project")
    cy.wait(2000)
    cy.contains("Export to S3 (Cognito)").click()
    cy.wait(200)
    cy.contains("CypressTest1")
    cy.contains("Close").click()
  })

  afterEach("Clean AWS", () => {
    removeAWSFile("CypressTest1")

    cy.log("should not be able to see the new project")
    cy.wait(200)
    cy.contains("Export to S3 (Cognito)").click()
    cy.wait(200)
    cy.contains("CypressTest1").should("not.exist")
    cy.contains("Close").click()
  })
})