# Event Booking GitOps AKS Project

A production-ready, cloud-native event booking application deployed on Azure Kubernetes Service (AKS) using GitOps principles with Terraform infrastructure provisioning and ArgoCD continuous deployment.

## Architecture Overview

This project implements a modern 3-tier web application with cloud-native deployment practices:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vue.js SPA    │    │   Node.js API   │    │   PostgreSQL    │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│   Port: 80      │    │   Port: 8080    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
         ┌─────────────────────────▼─────────────────────────┐
         │              Azure Kubernetes Service              │
         │                    (AKS Cluster)                  │
         │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐│
         │  │   ArgoCD    │  │ External    │  │   Azure     ││
         │  │   GitOps    │  │ Secrets     │  │ Key Vault   ││
         │  │ Deployment  │  │ Operator    │  │Integration  ││
         │  └─────────────┘  └─────────────┘  └─────────────┘│
         └───────────────────────────────────────────────────┘
                                  │
         ┌─────────────────────────▼─────────────────────────┐
         │             Terraform Infrastructure               │
         │         (Multi-Environment: dev/test/prod)         │
         └───────────────────────────────────────────────────┘
```

## Features

### Application Features
- **Event Availability Checking**: Real-time date availability verification
- **Online Booking System**: Complete booking flow with customer information
- **Admin Dashboard**: Comprehensive booking management interface
- **Data Export**: CSV export functionality for booking records
- **Responsive Design**: Mobile-first UI with modern design principles

### DevOps & Infrastructure Features
- **GitOps Deployment**: Automated deployments using ArgoCD
- **Multi-Environment**: Separate dev, test, and production environments
- **Infrastructure as Code**: Complete Terraform automation
- **CI/CD Pipeline**: GitHub Actions for build, test, and deploy
- **Security**: Azure Key Vault integration with External Secrets Operator
- **Monitoring**: Built-in health checks and logging
- **Scalability**: Auto-scaling AKS cluster configuration

## Project Structure

```
├── Event Booking/           # Application source code
│   ├── frontend/           # Vue.js frontend application
│   ├── backend/            # Node.js backend API
│   └── docker-compose.yml  # Local development setup
├── Infra/                  # Infrastructure as Code
│   ├── dev/               # Development environment
│   ├── test/              # Testing environment
│   └── prod/              # Production environment
├── Manifests/             # Kubernetes manifests
│   └── 3tire-configs/     # Application deployment configs
└── .github/workflows/     # CI/CD pipeline definitions
```

## Technology Stack

### Frontend
- **Framework**: Vue.js 3 with Composition API
- **Build Tool**: Vite for fast development and builds
- **Styling**: TailwindCSS for modern, responsive design
- **HTTP Client**: Axios for API communication
- **Deployment**: nginx server in Docker container

### Backend
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Prisma for type-safe database operations
- **Template Engine**: EJS for server-side rendering
- **Authentication**: Ready for Azure AD integration
- **Health Checks**: Built-in monitoring endpoints

### Database
- **Database**: PostgreSQL with persistent volume claims
- **Migration**: Prisma migrations for schema management
- **Backup**: Automated backup strategies ready

### Infrastructure
- **Cloud Provider**: Microsoft Azure
- **Container Orchestration**: Azure Kubernetes Service (AKS)
- **GitOps**: ArgoCD for continuous deployment
- **Infrastructure**: Terraform for resource provisioning
- **Secrets Management**: Azure Key Vault with External Secrets Operator
- **Monitoring**: Azure Monitor and Application Insights ready

### DevOps
- **CI/CD**: GitHub Actions workflows
- **Container Registry**: Docker Hub
- **Security Scanning**: Trivy for vulnerability assessment
- **Multi-Architecture**: ARM64 and AMD64 support

## Quick Start

### Prerequisites
- Azure CLI installed and authenticated
- Docker and Docker Hub account
- kubectl configured
- Terraform >= 1.0
- Node.js >= 18 (for local development)

### 1. Infrastructure Deployment
```bash
# Navigate to infrastructure directory
cd Infra/dev

# Initialize Terraform
terraform init

# Review and apply infrastructure
terraform plan
terraform apply
```

### 2. Configure GitHub Secrets
Set up the following secrets in your GitHub repository:
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub access token
- `GITOPS_TOKEN`: GitHub Personal Access Token with repo access

### 3. Deploy Application
```bash
# Push code to trigger CI/CD pipeline
git add .
git commit -m "Initial deployment"
git push origin main
```

### 4. Access Application
```bash
# Get the external IP address
kubectl get svc -n event-booking-dev

# Access the application at the LoadBalancer IP
```

## Local Development

### Backend Setup
```bash
cd "Event Booking/backend"
npm install
npm start  # Runs on http://localhost:8080
```

### Frontend Setup
```bash
cd "Event Booking/frontend"
npm install
npm run dev  # Runs on http://localhost:5173
```

### Database Setup
```bash
# Start PostgreSQL with Docker Compose
docker-compose up -d

# Run database migrations
cd backend
npx prisma migrate dev
```

## Multi-Environment Strategy

The project supports three environments with identical configurations:

- **Development** (`dev/`): Feature development and testing
- **Test** (`test/`): Integration testing and QA
- **Production** (`prod/`): Live production environment

Each environment maintains:
- Separate Terraform state files
- Independent Kubernetes namespaces
- Environment-specific resource sizing
- Isolated secrets management

## Security Features

- **Azure Key Vault**: Centralized secrets management
- **External Secrets Operator**: Kubernetes-native secret injection
- **Network Policies**: Pod-to-pod communication controls
- **RBAC**: Role-based access controls
- **Security Scanning**: Automated vulnerability assessments
- **SSL/TLS**: End-to-end encryption ready

## Monitoring & Observability

- **Health Checks**: Application and infrastructure health monitoring
- **Logging**: Centralized log collection and analysis
- **Metrics**: Custom metrics collection ready
- **Alerting**: Integration with Azure Monitor
- **Dashboards**: Grafana dashboards ready for deployment

## CI/CD Pipeline

The project includes four GitHub Actions workflows:

1. **Main CI/CD Pipeline**: Build, test, and deploy on code changes
2. **Pull Request Checks**: Validation and testing for PRs
3. **Manual Deployment**: On-demand deployment control
4. **Environment Sync**: Environment promotion automation

### Pipeline Features
- Smart change detection (backend/frontend)
- Parallel builds for faster deployment
- Multi-architecture Docker builds
- Security scanning with Trivy
- Automatic manifest updates

## API Documentation

### Core Endpoints
- `GET /availability?date=YYYY-MM-DD` - Check date availability
- `POST /book` - Create new booking
- `GET /admin/dashboard` - Admin interface
- `GET /admin/export` - Export bookings as CSV
- `GET /health` - Health check endpoint

### Booking Data Structure
```json
{
  "event_date": "2025-12-25",
  "event_type": "Wedding",
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "+1234567890"
}
```

## GitOps Workflow

1. **Code Changes**: Developers push changes to application repositories
2. **CI Pipeline**: GitHub Actions builds and tests the application
3. **Image Build**: Docker images are built and pushed to registry
4. **Manifest Update**: Deployment manifests are automatically updated
5. **ArgoCD Sync**: ArgoCD detects changes and deploys to Kubernetes
6. **Verification**: Health checks verify successful deployment

## Testing Strategy

- **Unit Tests**: Component and function-level testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full user workflow validation
- **Security Tests**: Vulnerability scanning
- **Performance Tests**: Load testing capabilities

## Scaling & Performance

- **Horizontal Pod Autoscaler**: Automatic pod scaling based on metrics
- **Cluster Autoscaler**: Node scaling based on resource demands
- **Resource Limits**: Proper resource allocation and limits
- **Caching**: Application-level caching strategies
- **CDN Ready**: Static asset optimization

## Maintenance & Operations

- **Automated Backups**: Database and configuration backups
- **Log Rotation**: Automated log management
- **Certificate Management**: Automated SSL certificate renewal
- **Update Strategies**: Rolling updates with zero downtime
- **Disaster Recovery**: Multi-region deployment ready

## Documentation

- [Infrastructure Guide](./Infra/README.md)
- [Application Development](./Event%20Booking/README.md)
- [Deployment Readiness Report](./DEPLOYMENT-READINESS-REPORT.md)
- [GitOps Workflow Guide](./Manifests/README.md)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

This project builds upon the excellent **Terraform Full Course with Azure** by Piyush Sachdeva. Special thanks for the comprehensive learning foundation provided.

---

**Built with Azure, Kubernetes, and GitOps best practices**

*Last Updated: August 30, 2025*
