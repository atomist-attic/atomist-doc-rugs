import { Given, When, Then, Result, ProjectScenarioWorld } from "@atomist/rug/test/Core";
import { Project } from "@atomist/rug/model/Project";

Given("a default mkdocs project", (p: Project) => {
  p.addFile("mkdocs.yml", "site_name: My Docs");
  p.addDirectory("docs", ".");
  p.addFile("docs/index.md", "blah");
});

When("running the MkDocs generator", (p: Project, world: ProjectScenarioWorld) => {
  let generator = world.generator("NewMkDocsDocumentationProject");
  world.generateWith(generator, {"extraDoc": "tutorials.md"});
});

Then("we have the MkDocs settings file and base structure", (p: Project) => {

    if( !p.fileExists("mkdocs.yml")) return new Result(false, "missing mkdocs.yml file");
    if( !p.directoryExists("docs")) return new Result(false, "missing docs directory");
    if( !p.fileExists("docs/index.md")) return new Result(false, "missing docs/index.md file");
    if( !p.fileExists("docs/tutorials.md")) return new Result(false, "missing docs/tutorials.md file");

    return true;
});