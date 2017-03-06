import { EditProject } from "@atomist/rug/operations/ProjectEditor";
import { Editor, Parameter, Tags } from "@atomist/rug/operations/Decorators";
import { Pattern } from "@atomist/rug/operations/RugOperation";
import { Project } from "@atomist/rug/model/Project";

@Editor("AddMarkdownDocumentToMkDocsProject", "adds a Markdown document to a MkDocs project")
@Tags("markdown", "documentation", "mkdocs")
export class AddMarkdownDocumentToMkDocsProject implements EditProject {

    @Parameter({
        description: "path of the new document in the project", 
        pattern: Pattern.any
    })
    filepath: string;

    @Parameter({
        description: "document's top-level title", 
        pattern: Pattern.any
    })
    title: string;

    @Parameter({
        description: "document's default content", 
        pattern: Pattern.any
    })
    content: string;

    edit(project: Project) {
        let data: string = `# ${this.title}\n\n${this.content}\n`;
        project.addFile(this.filepath, data);
    }
}
export const addMarkdownDocumentToMkDocsProject = new AddMarkdownDocumentToMkDocsProject();