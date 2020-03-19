import { User} from "./user.model";
import { ProjectTask } from "./projecttask.model"
export class Project
{
    projectid: any;
    projectnm: string;
    startdate: any;
    enddate: any;
    priority: any;
    noOfTask: any;
    nofCompTask: any;
    user: User;
    taskList: ProjectTask[];
}