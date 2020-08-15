import * as creators from './actionCreators';
import { CreatorsToActions } from './creatorsToActions';
export type Actions = CreatorsToActions<typeof creators>;
