# Event Booking Application - CI/CD Documentation

This document explains the automated CI/CD pipeline set up for the Event Booking application using GitHub Actions.

## Pipeline Overview

The CI/CD pipeline consists of three main workflows:

### 1. **Main CI/CD Pipeline** (`ci-cd-pipeline.yml`)
- **Trigger**: Push to `main` or `develop` branches
- **Purpose**: Build, test, and deploy the application automatically
- **Components**: Backend and Frontend pipelines run in parallel

### 2. **Pull Request Checks** (`pr-checks.yml`)
- **Trigger**: Pull requests to `main` or `develop`
- **Purpose**: Validate code quality, run tests, and security scans
- **Benefits**: Ensures code quality before merging

### 3. **Manual Deployment** (`manual-deploy.yml`)
- **Trigger**: Manual workflow dispatch
- **Purpose**: Deploy specific versions to specific environments
- **Use Case**: Hotfixes, rollbacks, or controlled deployments

## Setup Requirements

### 1. **GitHub Secrets**
Configure these secrets in your repository settings:

```
DOCKER_USERNAME     # Your Docker Hub username
DOCKER_PASSWORD     # Your Docker Hub password/token
GITOPS_TOKEN       # GitHub Personal Access Token with repo access
```

### 2. **Docker Hub Repository**
Ensure these repositories exist in Docker Hub:
- `akpadetsi/event-booking-backend`
- `akpadetsi/event-booking-frontend`

### 3. **GitOps Repository**
The manifests repository should be accessible:
- `cloudenochcsis/gitops-k8s-manifests`

## Pipeline Workflow

### Automatic Flow (on push to main):

1. **Change Detection**
   - Detects changes in `backend/` or `frontend/` directories
   - Runs only the affected component pipelines

2. **Backend Pipeline** (if backend changed):
   ```
   Install Dependencies → Generate Prisma → Run Tests → Build Docker → Push to Hub
   ```

3. **Frontend Pipeline** (if frontend changed):
   ```
   Install Dependencies → Run Tests → Build App → Build Docker → Push to Hub
   ```

4. **Update Manifests**:
   - Automatically updates image tags in GitOps repository
   - Uses format: `main-{7-char-sha}` (e.g., `main-a1b2c3d`)

5. **ArgoCD Deployment**:
   - ArgoCD detects manifest changes
   - Automatically deploys to Kubernetes cluster

## Image Tagging Strategy

- **Main Branch**: `main-{short-sha}` + `latest`
- **Feature Branches**: `{branch-name}-{short-sha}`
- **Pull Requests**: `pr-{number}-{short-sha}`

## Manual Deployment Options

Use the manual deployment workflow for:

- **Environment Selection**: `dev`, `test`, `prod`
- **Component Selection**: `all`, `backend`, `frontend`
- **Custom Tags**: Deploy specific image versions

## Security Features

- **Multi-platform Builds**: `linux/amd64` and `linux/arm64`
- **Security Scanning**: Trivy scans for vulnerabilities
- **Sensitive Data**: All credentials stored as GitHub secrets
- **Build Caching**: Docker layer caching for faster builds

## Monitoring & Notifications

- **Build Status**: Visible in GitHub Actions tab
- **Deployment Summary**: Detailed summaries in workflow runs
- **ArgoCD Sync**: Monitor in ArgoCD dashboard

## Local Development

To test Docker builds locally:

```bash
# Backend
cd backend
docker build -t event-booking-backend:test .

# Frontend  
cd frontend
docker build -t event-booking-frontend:test .
```

## Rollback Process

To rollback to a previous version:

1. Go to **Actions** → **Manual Deployment Trigger**
2. Select target environment
3. Enter the previous image tag
4. Run workflow

## Pipeline Optimization

- **Parallel Execution**: Backend and frontend build simultaneously
- **Smart Caching**: npm and Docker layer caching
- **Conditional Execution**: Only affected components are rebuilt
- **Multi-architecture**: Support for different CPU architectures

## Benefits

- **Automated Testing**: Every commit is tested
- **Fast Deployment**: Changes deploy automatically
- **Quality Gates**: PR checks prevent bad code
- **Rollback Ready**: Easy rollback capabilities
- **Security First**: Built-in vulnerability scanning
- **GitOps Compliant**: True declarative deployments
