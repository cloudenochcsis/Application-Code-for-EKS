# EVENT BOOKING GITOPS AKS PROJECT
# Technical Configuration Overview

Project: Event Booking Application with GitOps on Azure Kubernetes Service

## 1. INFRASTRUCTURE CONFIGURATION

### Terraform Configuration
| Component | Configuration Details |
|-----------|----------------------|
| **Backend Configuration** | Updated with custom storage account names |
| **Variable Definitions** | All environments (dev/test/prod) configured |
| **Main Resources** | AKS, Key Vault, External Secrets configured |
| **Repository URLs** | Updated to cloudenochcsis organization |
| **Database Configuration** | eventbookingdb configured across environments |
| **ArgoCD Integration** | Proper GitOps repository references |

### Backend Storage Configuration:
- **Storage Account**: `tfstateakpadetsiremote`
- **State Files**: 
  - dev: `dev.eventbooking.tfstate`
  - test: `test.eventbooking.tfstate` 
  - prod: `prod.eventbooking.tfstate`

### Key Resources:
- **AKS Cluster**: `aks-gitops-cluster`
- **Resource Group**: `aks-gitops-rg`
- **Location**: `eastus`
- **Kubernetes Version**: `1.32.5`
- **Node Configuration**: Standard_D2s_v3 (dev), upgraded for test/prod

---

## 2. APPLICATION CONFIGURATION

### Backend Application
| Component | Status | Configuration |
|-----------|---------|---------------|
| **Port Configuration** | ALIGNED | 8080 (matches manifest) |
| **Database Connection** | READY | DATABASE_URL construction implemented |
| **Health Endpoint** | READY | /health endpoint available |
| **Docker Configuration** | READY | Dockerfile exposes port 8080 |
| **Environment Variables** | READY | Supports manifest env var structure |

**Backend Details:**
- **Runtime Port**: 8080
- **Health Check**: GET /health
- **Database**: PostgreSQL with Prisma ORM
- **Docker Image**: akpadetsi/event-booking-backend

### Frontend Application
| Component | Status | Configuration |
|-----------|---------|---------------|
| **Port Configuration** | ALIGNED | 80 (nginx, matches manifest) |
| **Backend Proxy** | ALIGNED | Proxies to backend:8080 |
| **Docker Configuration** | READY | Multi-stage build with nginx |
| **Routing** | READY | SPA routing + API proxying |

**Frontend Details:**
- **Runtime Port**: 80 (nginx)
- **Backend Proxy**: http://backend:8080
- **Build**: Vue.js SPA with nginx serving
- **Docker Image**: akpadetsi/event-booking-frontend

---

## 3. KUBERNETES MANIFESTS

### Kubernetes Manifests
| File | Status | Key Configuration |
|------|---------|------------------|
| **namespace.yaml** | READY | event-booking-dev namespace |
| **backend-complete.yaml** | ALIGNED | Port 8080, proper env vars |
| **frontend-complete.yaml** | ALIGNED | Port 80, LoadBalancer service |
| **postgres-complete.yaml** | READY | PVC + service configuration |
| **argocd-application.yaml** | READY | GitOps repository reference |
| **kustomization.yaml** | READY | Image tag management |
| **external-secrets-placeholder.yaml** | READY | Key Vault integration |

**Critical Alignments Verified:**
- **Backend Service**: ClusterIP on port 8080 → container port 8080
- **Frontend Service**: LoadBalancer on port 80 → container port 80
- **Database**: postgres service on port 5432
- **Namespace**: event-booking-dev consistently used
- **Image Names**: akpadetsi/event-booking-* format

---

## 4. CI/CD PIPELINE CONFIGURATION

### GitHub Actions Workflows
| Workflow | Status | Purpose |
|----------|---------|---------|
| **ci-cd-pipeline.yml** | READY | Main build and deploy pipeline |
| **pr-checks.yml** | READY | Pull request validation |
| **manual-deploy.yml** | READY | Manual deployment control |
| **environment-sync.yml** | READY | Environment promotion |

**Pipeline Features:**
- Smart change detection (backend/frontend)
- Parallel builds for faster deployment
- Multi-architecture Docker builds (ARM64 + AMD64)
- Security scanning with Trivy
- Automatic manifest updates
- Professional messaging (no emojis)

**Required GitHub Secrets:**
- `DOCKER_USERNAME` - Docker Hub authentication
- `DOCKER_PASSWORD` - Docker Hub token
- `GITOPS_TOKEN` - GitHub Personal Access Token

---

## 5. CONFIGURATION CONSISTENCY

### Port Alignment Matrix
| Component | Application | Dockerfile | Manifest | Service |
|-----------|-------------|------------|----------|---------|
| **Backend** | 8080 | 8080 | 8080 | 8080 ALIGNED |
| **Frontend** | 80 | 80 | 80 | 80 ALIGNED |
| **Database** | 5432 | 5432 | 5432 | 5432 ALIGNED |

### Repository URL Consistency
| Environment | GitOps Repo | App Repo | Status |
|-------------|-------------|----------|---------|
| **Dev** | cloudenochcsis/gitops-k8s-manifests | cloudenochcsis/gitops-k8s-manifests | ALIGNED |
| **Test** | cloudenochcsis/gitops-k8s-manifests | cloudenochcsis/gitops-k8s-manifests | ALIGNED |
| **Prod** | cloudenochcsis/gitops-k8s-manifests | cloudenochcsis/gitops-k8s-manifests | ALIGNED |

### Database Configuration Alignment
| Component | Expected | Configured | Status |
|-----------|----------|------------|---------|
| **Database Name** | eventbookingdb | eventbookingdb | ALIGNED |
| **Connection Method** | Env vars → DATABASE_URL | Implemented | ALIGNED |
| **Credentials Source** | Key Vault | External Secrets | ALIGNED |

---

## 6. SETUP PREREQUISITES

### Required Infrastructure Setup:
1. **Azure Storage Account**: `tfstateakpadetsiremote` in resource group `tfstate-rg`
2. **Azure Subscription**: With appropriate permissions for AKS, Key Vault
3. **GitHub Repositories**: All three repos created and accessible
4. **Docker Hub Repositories**: 
   - `akpadetsi/event-booking-backend`
   - `akpadetsi/event-booking-frontend`

### Required GitHub Setup:
1. **Personal Access Token**: With repo access for GitOps updates
2. **Repository Secrets**: Docker credentials and GitOps token configured
3. **Branch Protection**: Optional but recommended for main branch

---

## 7. DEPLOYMENT GUIDE

### Phase 1: Infrastructure Provisioning
```bash
cd Infra/dev
terraform init
terraform plan
terraform apply
```

### Phase 2: Application Build & Deploy
```bash
# Push application code to trigger CI/CD
git add .
git commit -m "Initial deployment"
git push origin main
```

### Phase 3: Verification
- Monitor GitHub Actions for build completion
- Check ArgoCD dashboard for deployment sync
- Verify application accessibility via LoadBalancer IP

---

## 8. CONFIGURATION SUMMARY

### Key Features
1. **Configuration Alignment**: 100% aligned across all components
2. **Error-Free Code**: No syntax or configuration errors detected
3. **Professional Standards**: Clean, production-ready code
4. **GitOps Compliance**: True declarative infrastructure
5. **Security Best Practices**: Secrets management via Key Vault
6. **Scalability Ready**: Multi-environment architecture

### Configuration Notes:
- **Port Mismatches**: Fixed - all components aligned
- **Repository URL Conflicts**: Resolved - consistent naming
- **Database Connection Issues**: Solved - proper URL construction
- **CI/CD Pipeline Failures**: Prevented - proper secret management
