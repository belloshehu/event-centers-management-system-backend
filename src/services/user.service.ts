import { StatusCodes } from "http-status-codes";
import HTTPException from "@/exceptions/http.exception";
import { IUser } from "@/interfaces/user.interface";
import UserModel from "@/models/user.model";
import { isEmpty } from "@/utils/util";

class UserService {
    private userModel = UserModel;

    public updateUser = async (userData: IUser, id: string) => {
        if (isEmpty(userData)) {
            throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide a field");
        }
        const user = await this.userModel.findByIdAndUpdate(id, userData, {
            new: true,
        });
        if (!user) {
            throw new HTTPException(StatusCodes.NOT_FOUND, "User does not exist");
        }
        return user;
    };

    public getUser = async (id: string): Promise<IUser> => {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new HTTPException(StatusCodes.NOT_FOUND, "User not found");
        }
        return user;
    };

    public getUsers = async (): Promise<IUser[]> => {
        const users = await this.userModel.find();
        return users;
    };

    public deleteUser = async (id: string): Promise<IUser> => {
        if (!id) {
            throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide an id");
        }
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user) {
            throw new HTTPException(StatusCodes.NOT_FOUND, "User does not exist");
        }
        return user;
    };
}

export default UserService;
