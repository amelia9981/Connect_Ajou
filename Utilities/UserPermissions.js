import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

class UserPermissions {
    getCameraPermission = async () => {
        if (Constants.platform.io) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA)

            if (status != "granted") {
                alert("Need your permission!");
            }
        }
    }
}

export default new UserPermissions();