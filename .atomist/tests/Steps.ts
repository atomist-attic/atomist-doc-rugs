import { Given, When, Then, Result } from "@atomist/rug/test/Core"
import { Project } from "@atomist/rug/model/Project"
import { NewMkDocsDocumentationProject } from "../editors/NewMkDocsDocumentationProject"
import { AddMarkdownDocumentToMkDocsProject } from "../editors/AddMarkdownDocumentToMkDocsProject"

Given("a default mkdocs project", p => {
  p.addFile("mkdocs.yml", "site_name: My Docs");
  p.addDirectory("docs", ".");
  p.addFile("docs/index.md", "blah");
});

When("running the MkDocs generator", p => {
  let generator: NewMkDocsDocumentationProject = new NewMkDocsDocumentationProject();
  generator.extraDoc = "tutorials.md";
  generator.populate(p);
});

Then("we have the MkDocs settings file and base structure", p => {
    var r: boolean = true;
    
    r = r && p.fileExists("mkdocs.yml");
    r = r && p.directoryExists("docs");
    r = r && p.fileExists("docs/index.md");
    r = r && p.fileExists("docs/tutorials.md");

    // I could do better than this I guess
    return new Result(r, "project creation result");
});