pipeline {
    agent any

    tools {
        jdk 'jdk17' // Name from Global Tool Configuration
        nodejs 'nodejs-10' // Name of NodeJS configuration
        maven 'maven3' // Name from Global Tool Configuration
    }

    environment {
        SCANNER_HOME = tool 'SonarScanner'
        OWASP_DC_TOOL = 'DependencyCheck'
        DOCKER_TOOL = 'Docker'
        DOCKER_CRED_ID = 'docker-cred' // Docker credentials ID configured in Jenkins
        DOCKER_HUB_USERNAME = 'your_docker_username' // <<< REPLACE with your Docker Hub username
    }

    stages {
        stage('Git Checkout') {
            steps {
                echo 'Cloning Git repository...'
                git branch: 'main', url: 'YOUR_GITHUB_REPO_URL' // <<< REPLACE THIS with your forked GitHub repository URL
            }
        }

        stage('NPM Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }

        stage('OWASP Dependency Check') {
            steps {
                echo 'Running OWASP Dependency Check scan...'
                dependencyCheck additionalArguments: '--scan . --format XML', odcInstallation: "${OWASP_DC_TOOL}", 
                ]
            }
      

        stage('Docker Build and Push Image') {
            steps {
                echo 'Building and pushing Docker image...'
                script {
                    withDockerRegistry(credentialsId: env.DOCKER_CRED_ID, toolName: env.DOCKER_TOOL) {
                        def image = docker.build("${env.DOCKER_HUB_USERNAME}/demo-nodejs:latest", '.')
                        image.push()
                    }
                }
            }
        }

        stage('Deploy Application Using Docker Container') {
            steps {
                echo 'Deploying application in Docker container...'
                script {
                    // Stop and remove any existing container to ensure a clean deployment
                    sh "docker stop demo-nodejs-container || true"
                    sh "docker rm demo-nodejs-container || true"

                    // Run the new container, mapping internal port 8081 to host port 8082
                    sh "docker run -d --name demo-nodejs-container -p 8082:8081 ${env.DOCKER_HUB_USERNAME}/demo-nodejs:latest"
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
