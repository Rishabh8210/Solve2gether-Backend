# Welcome to SolveTogether

## Configuration

### Project Setup
 - #### Environment Variables
    - Create a `.env` file in the root diretory and add the following environment variables.
        - `PORT = 3000`
        - `DBURL = "mongodb+srv://<Username>:<password>@<clustername.clusterid>.mongodb.net/"`
        - `SALT = 10`
        - `JWT_SECRET_KEY = <YOUR_SECRET_KEY>`

### Features
    - User signup/signin feature completed
    - Send friend request, Accept friend request, Remove friend feature completed
    - Added uploading question feature (required file is in `csv format` and `column` name must be `title` and `questionLink`)

![image](https://github.com/user-attachments/assets/f5bfa0cc-a17a-4b05-a51c-6761e9d553ea)

    - And setup this things in frontend side
    ```
        const formData = new FormData();
        formData.append('file', <uploaded_data_variable_name>);
        
        headers: {
            'Content-Type': 'multipart/form-data',
        } 
    ```
- [Or you can clone this file too / Frontend side code](https://github.com/Rishabh8210/Csv-parser-client.git)s