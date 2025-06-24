Setup and Installation Guide
This guide will walk you through setting up the Jenkins server, configuring tools, and running the CI/CD pipeline. The Node.js application code is sourced from a public repository, with the focus of this project being the pipeline itself.

Prerequisites
An operating system capable of running Jenkins (e.g., Ubuntu Linux).
Git installed.
Docker Engine installed and running (for SonarQube container and application deployment).
A running Jenkins instance (ensure it has sufficient resources, especially for builds with multiple tools).
An active Docker Hub account (for pushing images to the public registry).
A SonarQube server instance running (e.g., run SonarQube in a Docker container using:
Bash

sudo docker run -d --name sonar-server -p 9000:9000 sonarqube:lts-community
Then, access http://YOUR_SERVER_IP:9000, log in (admin/admin), change password, and generate a SonarQube token: Administration > Security > Users > admin user > Tokens. Copy this token immediately!

                                     
Part 1: Setting up the Jenkins Server and Core Tools (On your Ubuntu Server)
Prepare your Ubuntu Server:
Bash

sudo apt update
sudo apt upgrade -y
sudo apt install -y wget curl unzip gnupg lsb-release
Install Java (OpenJDK 17):
Bash

sudo apt install -y openjdk-17-jdk
java -version # Verify installation, you should see 'openjdk version "17.0.x"'
Install Jenkins:
Refer to the official Jenkins installation guide for your operating system:
https://www.jenkins.io/doc/book/installing/

After installation, complete the initial Jenkins Setup (Web UI):

Access Jenkins at http://YOUR_SERVER_IP:8080.
Get initial admin password: sudo cat /var/lib/jenkins/secrets/initialAdminPassword.
Paste password, install suggested plugins, create admin user, save URL.
Install Docker:
Refer to the official Docker Engine installation guide for Ubuntu:
https://docs.docker.com/engine/install/ubuntu/

After installation, perform these additional steps:

Bash

sudo docker run hello-world # Verify Docker is working
sudo usermod -aG docker jenkins # Add jenkins user to docker group
sudo systemctl restart docker
sudo systemctl restart jenkins
Install Maven:
Bash

sudo apt install -y maven # This typically installs the latest stable Maven.
mvn -version # Verify installation
Install SonarQube (as a Docker Container):

# Install Trivy
sudo apt-get update
sudo apt-get install -y trivy
trivy --version # Verify installation
'

Part 2: Configuring Jenkins Global Tools and Credentials (Jenkins Web UI)
Navigate to Jenkins Dashboard -> Manage Jenkins.

Install Required Jenkins Plugins:
Go to Plugins -> Available plugins. Install: NodeJS, Maven Integration plugin, SonarQube Scanner, OWASP Dependency-Check, Docker, Docker Pipeline 
                                     
Configure Global Tool Configurations:
Go to Global Tool Configuration.

JDK: Add JDK (Name: jdk17, Install automatically from Adoptium, Version: 17.0.x).
NodeJS: Add NodeJS (Name: nodejs10, Install automatically from nodejs.org, Version: 10.19.0).
Maven: Add Maven (Name: maven3, Install automatically, latest version).
SonarQube Scanner: Add SonarQube Scanner (Name: sonarscanner, Install automatically, latest version).
OWASP Dependency-Check: Add (Name: DependencyCheck, Install automatically, Version: 6.5.1 or latest).
Docker: Add (Name: Docker, Install automatically, latest version).
Configure System (SonarQube Server):
Go to Configure System.

Scroll to SonarQube Servers. Click Add SonarQube.
Name: sonar
Server URL: http://YOUR_SERVER_IP:9000
Authentication Token: Click "Add" -> "Jenkins". Kind: Secret text. Secret: Paste your SonarQube token. ID: sonar-token. Click "Add". Then select sonar-token from dropdown.
Add Credentials (Docker Hub):
Go to Credentials -> System -> Global credentials (unrestricted) -> Add Credentials.

Kind: Username with password.
Username: Your Docker Hub username.
Password: Your Docker Hub Access key (or password).
ID: docker-cred.
Click "Create".

                                     
                                     
Part 3: Preparing the Node.js Application
Fork the Repository: Fork the sample Node.js web application repository to your own GitHub account: https://github.com/YOUR_GITHUB_USERNAME/demo-nodejs-webpage (based on your transcript, this was your repo name).
Review package.json and Dockerfile: Understand the application's dependencies and containerization.

Part 4: Creating the Jenkins Pipeline Job
Create New Jenkins Job:
Go to Jenkins Dashboard -> New Item.
Item Name: Give a name (e.g., nodejs-ci-cd-pipeline).
Select: "Pipeline". Click "OK".
Configure Pipeline Job:
General Tab: Check "Discard old builds", set "Max # of builds to keep" to 2.

Pipeline Tab:

Definition: "Pipeline script".

Script: Paste the following Jenkinsfile content.

Remember to replace YOUR_GITHUB_REPO_URL with your forked GitHub repository URL.
Replace your_docker_username with your actual Docker Hub username in all relevant places.
<!-- end list -->


Part 5: Running the Pipeline and Accessing the Application
Running the Pipeline:
Go to the pipeline job you just created (e.g., nodejs-ci-cd-pipeline).
Click "Build Now" on the left sidebar to manually trigger the pipeline execution.
Monitor the build progress in the "Build History" section. Click on the build number and then "Console Output" to see detailed logs.
Accessing the Deployed Application:
Once the "Deploy Application Using Docker Container" stage completes successfully:

Open your web browser.
Navigate to the IP address of your Jenkins server (which is also where the application is deployed).
Access the application on port 8082: http://YOUR_SERVER_IP:8082
Note: Ensure your server's firewall (e.g., AWS Security Group) allows inbound traffic on port 8082 from your IP address or 0.0.0.0/0 for wider access.
