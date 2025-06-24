# Project Overview

This project focuses on building an end-to-end CI/CD pipeline using **Jenkins** to automate the build, security analysis, and Docker-based deployment of a Node.js web application from scratch.



## Key Features

* Automated retrieval of Node.js application source code from GitHub at the start of each pipeline execution.
* Installation of all required Node.js dependencies using `npm install`.
* Performing a security analysis on the source code and its dependencies using **OWASP Dependency Check**.
* Building a Docker image for the Node.js application.
* Pushing the built Docker image to a public Docker Hub repository.
* Deploying the Node.js application within a Docker container.
* Creation of a basic Node.js web application from scratch with "home" and "about" sections.
* Containerized deployment ensuring portability and consistent environment.

## Technologies Used

* **Jenkins:** The primary CI/CD automation server, orchestrating the entire pipeline from code retrieval to deployment.
* **GitHub:** Version control system for source code management and central repository for the application code.
* **Node.js:** The runtime environment and programming language for the web application.
* **npm (Node Package Manager):** Used for installing Node.js application dependencies.
* **Express.js:** The web framework used for the Node.js application.
* **OWASP Dependency Check:** Security analysis tool integrated into the pipeline to identify known vulnerabilities in project dependencies.
* **Docker:** Containerization platform used to package the Node.js application and its environment into a portable image.
* **Docker Hub:** Public container registry for storing and managing the built Docker images.
* **Shell Scripting:** Used within Jenkins pipeline stages for executing commands (e.g., Docker commands, npm commands).
* **Groovy:** The language used for writing the Jenkins Pipeline (Jenkinsfile).


## Architecture / Workflow

The pipeline is designed to automate the software development lifecycle with integrated security.

1.  **Pipeline Initiation & Git Checkout:** The Jenkins pipeline is manually triggered. As its first step, it fetches the Node.js application source code from the GitHub repository into the Jenkins workspace.
2.  **npm Install Dependencies:** All required Node.js dependencies specified in `package.json` are installed using `npm install`.
3.  **OWASP Dependency Check:** A security scan is performed on the source code and its dependencies to identify known vulnerabilities.
4.  **Docker Build & Push Image:** A Docker image for the Node.js application is built using a `Dockerfile`, then tagged and pushed to a public Docker Hub repository.
5.  **Deploy Application Using Docker Container:** The Node.js application is deployed by running a Docker container from the newly built image, making the application accessible in a browser.


## Important Considerations

* **AWS EC2 Costs:** This project typically utilizes an AWS EC2 instance (e.g., T2.Medium or similar for Jenkins). Please be aware that instances beyond the AWS Free Tier will incur charges. Monitor your AWS billing dashboard to avoid unexpected costs.
* **Resource Management:** Ensure you stop or terminate your EC2 instance and any running Docker containers (after completing your demonstration) when not in use to minimize expenses.
* **Public IP Address & Firewall:** Access to Jenkins (port 8080) and the deployed Node.js application (port 8082) relies on the EC2 instance's public IP address. Ensure your AWS Security Group allows inbound traffic on these specific ports from your IP address or `0.0.0.0/0` (use `0.0.0.0/0` with caution in production environments).
* **Project Scope and Focus:** The Node.js web application itself is a basic, "from scratch" sample with simple home and about pages. The primary objective of this project is to demonstrate the end-to-end CI/CD pipeline automation using Jenkins and Docker for a Node.js application, rather than showcasing complex application features.
* **Security Findings:** OWASP Dependency Check will likely identify vulnerabilities in the Node.js dependencies. This is a normal outcome of such scans, and the purpose here is to demonstrate the identification of these issues within the pipeline. In a real-world scenario, addressing and mitigating these vulnerabilities would be a crucial next step.

---

## Challenges and Solutions

* **Node.js Tool Definition in Jenkins Pipeline:**
    * **Challenge:** Although the Node.js tool was installed globally in Jenkins, the pipeline initially failed to recognize `npm install` commands within the pipeline script because the Node.js tool environment was not properly defined for the pipeline's scope.
    * **Solution:** Incorporated the `nodejs` tool definition within the `tools` block of the Jenkinsfile (`nodejs 'nodejs-10'`). This ensured that the `npm` executable was correctly available in the pipeline's environment, allowing `npm install` to execute successfully.
* **OWASP Dependency Check Report Not Found:**
    * **Challenge:** The OWASP Dependency Check stage initially reported "unable to find dependency check reports to pass" even though the scan itself ran. This indicated an issue with how the report was being generated or located by the publisher.
    * **Solution:** Ensured the `dependencyCheck` step was configured with the correct `pattern` for the report (e.g., `--format XML`) and that the `publisher` was correctly defined to process this format, allowing the stage to complete without error and integrate the findings into the Jenkins build report.

---

## Lessons Learned

* **End-to-End CI/CD Mastery:** Gained hands-on experience in designing, implementing, and managing a complete CI/CD pipeline from source code to deployed application.
* **DevSecOps Integration:** Understood the critical importance and practical application of integrating security tools (SonarQube, OWASP Dependency Check) early in the development lifecycle to identify and address vulnerabilities.
* **Pipeline Orchestration with Jenkins:** Deepened proficiency in using Jenkins for automated builds, tests, and deployments, including configuring global tools and credentials securely.
* **Maven for Java Builds:** Solidified understanding of Maven's role in compiling, packaging, and managing dependencies for Java applications.
* **Troubleshooting and Debugging:** Enhanced ability to diagnose and resolve issues within complex pipeline stages by analyzing console output and understanding tool interactions.
* **New Insights Gained:**
    * The significant impact of initial setup times for security tools (like database downloads) on the first build, and how subsequent runs benefit from caching.
    * The importance of precise build commands (e.g., `mvn clean package` vs. `mvn clean compile`) for successful artifact generation.

---

## Future Enhancements

* **Automated Webhook Triggers:** Implement GitHub webhooks to automatically trigger the Jenkins pipeline upon code commits, transitioning from manual triggers to a fully continuous integration workflow.
* **Advanced Security Gates:** Configure Jenkins to automatically fail pipeline builds based on predefined thresholds of critical or high-severity vulnerabilities and code quality issues detected by SonarQube and OWASP Dependency Check, enforcing stricter DevSecOps compliance.

---

