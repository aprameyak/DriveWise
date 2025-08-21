#!/bin/bash

# DriveWise Deployment Script
# This script automates the build and submission process for both iOS and Android

set -e

echo "🚗 DriveWise Deployment Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if EAS CLI is installed
check_eas_cli() {
    if ! command -v eas &> /dev/null; then
        print_error "EAS CLI is not installed. Please install it first:"
        echo "npm install -g eas-cli"
        exit 1
    fi
    print_success "EAS CLI is installed"
}

# Check if logged in to Expo
check_expo_login() {
    if ! eas whoami &> /dev/null; then
        print_error "Not logged in to Expo. Please login first:"
        echo "eas login"
        exit 1
    fi
    print_success "Logged in to Expo"
}

# Build function
build_app() {
    local platform=$1
    local profile=$2
    
    print_status "Building for $platform with profile: $profile"
    
    if eas build --platform $platform --profile $profile; then
        print_success "Build completed for $platform"
    else
        print_error "Build failed for $platform"
        exit 1
    fi
}

# Submit function
submit_app() {
    local platform=$1
    
    print_status "Submitting to $platform store"
    
    if eas submit --platform $platform; then
        print_success "Submission completed for $platform"
    else
        print_error "Submission failed for $platform"
        exit 1
    fi
}

# Main deployment function
deploy() {
    local platform=$1
    local profile=${2:-production}
    local submit=${3:-false}
    
    print_status "Starting deployment for $platform"
    
    # Build the app
    build_app $platform $profile
    
    # Submit if requested
    if [ "$submit" = "true" ]; then
        submit_app $platform
    fi
    
    print_success "Deployment completed for $platform"
}

# Development build
dev_build() {
    local platform=$1
    
    print_status "Creating development build for $platform"
    build_app $platform development
}

# Production build
prod_build() {
    local platform=$1
    
    print_status "Creating production build for $platform"
    build_app $platform production
}

# Full deployment with submission
full_deploy() {
    local platform=$1
    
    print_status "Starting full deployment with submission for $platform"
    deploy $platform production true
}

# Show usage
show_usage() {
    echo "Usage: $0 [COMMAND] [PLATFORM] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  dev-build [ios|android]     Create development build"
    echo "  prod-build [ios|android]    Create production build"
    echo "  deploy [ios|android]        Deploy to store (build + submit)"
    echo "  build-all                   Build for both platforms"
    echo "  deploy-all                  Deploy to both stores"
    echo ""
    echo "Examples:"
    echo "  $0 dev-build ios"
    echo "  $0 prod-build android"
    echo "  $0 deploy ios"
    echo "  $0 deploy-all"
    echo ""
}

# Main script logic
main() {
    # Check prerequisites
    check_eas_cli
    check_expo_login
    
    case "$1" in
        "dev-build")
            if [ -z "$2" ]; then
                print_error "Platform required for dev-build"
                show_usage
                exit 1
            fi
            dev_build $2
            ;;
        "prod-build")
            if [ -z "$2" ]; then
                print_error "Platform required for prod-build"
                show_usage
                exit 1
            fi
            prod_build $2
            ;;
        "deploy")
            if [ -z "$2" ]; then
                print_error "Platform required for deploy"
                show_usage
                exit 1
            fi
            full_deploy $2
            ;;
        "build-all")
            print_status "Building for both platforms"
            dev_build ios
            dev_build android
            print_success "All builds completed"
            ;;
        "deploy-all")
            print_status "Deploying to both stores"
            full_deploy ios
            full_deploy android
            print_success "All deployments completed"
            ;;
        *)
            show_usage
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
