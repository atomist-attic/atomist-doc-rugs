import { PopulateProject } from "@atomist/rug/operations/ProjectGenerator";
import { Generator, Parameter, Tags } from "@atomist/rug/operations/Decorators";
import { Pattern } from "@atomist/rug/operations/RugOperation";
import { Project } from "@atomist/rug/model/Project";
import { File } from "@atomist/rug/model/File";

@Generator("NewMkDocsDocumentationProject", "creates a MkDocs project")
@Tags("markdown", "documentation", "mkdocs")
export class NewMkDocsDocumentationProject implements PopulateProject {

    @Parameter({
        displayName: "Extra Page Name",
        description: "name of an extra page to add to project",
        pattern: Pattern.any,
        validInput: "free text",
        minLength: 1,
        maxLength: 100
    })
    extraDoc: string = "extra.md";

    populate(project: Project) {
        
        let f: File = project.findFile("mkdocs.yml");
        if (f != null) {
            f.replace("My Docs", "hahaha");  
        }
        
        project.editWith("AddMarkdownDocumentToMkDocsProject", {
            "filepath": "docs/" + this.extraDoc,
            "title": "Extra Extra",
            "content": "Read all about it"
        });
    }
}
export const newMkDocsDocumentationProject = new NewMkDocsDocumentationProject();