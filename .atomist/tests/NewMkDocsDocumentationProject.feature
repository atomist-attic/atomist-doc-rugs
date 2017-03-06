Feature: Creating new MkDocs projects

Scenario: A default MkDocs project structure should be generated
 Given a default mkdocs project
 When running the MkDocs generator
 Then we have the MkDocs settings file and base structure