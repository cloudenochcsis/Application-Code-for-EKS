#!/bin/bash

# GitHub Repository Setup Script for Event Booking CI/CD
# This script helps you set up the required secrets and configurations

set -e

echo "Event Booking CI/CD Setup Helper"
echo "=================================="
echo ""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "ERROR: GitHub CLI (gh) is not installed."
    echo "Please install it from: https://cli.github.com/"
    exit 1
fi

# Check if user is logged in to GitHub CLI
if ! gh auth status &> /dev/null; then
    echo "ERROR: Please login to GitHub CLI first:"
    echo "gh auth login"
    exit 1
fi

echo "SUCCESS: GitHub CLI is installed and authenticated"
echo ""

# Get repository information
echo "📋 Repository Setup"
echo "Please provide the following information:"
echo ""

read -p "GitHub repository (owner/repo-name): " GITHUB_REPO
read -p "Docker Hub username: " DOCKER_USERNAME
read -s -p "Docker Hub password/token: " DOCKER_PASSWORD
echo ""
read -s -p "GitHub Personal Access Token (for GitOps): " GITOPS_TOKEN
echo ""
echo ""

# Confirm settings
echo "Configuration Summary:"
echo "Repository: $GITHUB_REPO"
echo "Docker Hub Username: $DOCKER_USERNAME"
echo "Docker Hub Password: [HIDDEN]"
echo "GitOps Token: [HIDDEN]"
echo ""

read -p "Is this information correct? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "ERROR: Setup cancelled."
    exit 1
fi

echo ""
echo "Setting up GitHub repository secrets..."

# Set GitHub secrets
gh secret set DOCKER_USERNAME -b "$DOCKER_USERNAME" -R "$GITHUB_REPO"
gh secret set DOCKER_PASSWORD -b "$DOCKER_PASSWORD" -R "$GITHUB_REPO"
gh secret set GITOPS_TOKEN -b "$GITOPS_TOKEN" -R "$GITHUB_REPO"

echo "SUCCESS: GitHub secrets configured successfully!"
echo ""

echo "Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Push your code to the repository"
echo "2. Create Docker Hub repositories:"
echo "   - akpadetsi/event-booking-backend"
echo "   - akpadetsi/event-booking-frontend"
echo "3. Ensure your GitOps repository is accessible:"
echo "   - cloudenochcsis/gitops-k8s-manifests"
echo "4. Make your first commit to trigger the pipeline!"
echo ""
echo "For detailed documentation, see CI-CD-README.md"
