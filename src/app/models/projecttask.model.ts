import { User} from "./user.model";
import { ParentTask} from "./parenttask.model";

export class ProjectTask{

    taskid: any;
    parentTaskEntity: ParentTask;
    userEntity:User;
    taskname: string;
    startdate: any;
    enddate: any;
    priority: any;
    status: any;
}