# Dokku Deployment Reference

## What is Dokku?
> Source: https://dokku.com/docs/getting-started/installation/#what-is-dokku

> Dokku is an extensible, open source Platform as a Service that runs on a single server of your choice. Dokku supports building apps on the fly from a git push via either Dockerfile or by auto-detecting the language with Buildpacks, and then starts containers based on your built image. Using technologies such as nginx and cron, Web processes are automatically routed to, while background processes and automated cron tasks are also managed by Dokku.

## Zero-Downtime Deployments & Health Checks

### Health Checks Configuration
> Source: https://dokku.com/docs/deployment/zero-downtime-deploys/

Health checks can be configured in your `app.json` file:
```json
{
  "healthchecks": {
    "web": [
      {
        "type": "startup",
        "name": "web check",
        "description": "Checking if web server started",
        "path": "/",
        "attempts": 3,
        "timeout": 5,
        "wait": 5
      }
    ]
  }
}
```

Each health check has the following properties:
- `type`: Type of check ("startup" or "path")
- `name`: Name of the check for identification
- `description`: Human readable description of check
- `path`: URL path to check
- `attempts`: Number of retries
- `timeout`: Timeout in seconds
- `wait`: Time to wait between retries

### Zero-Downtime Process
When deploying with health checks enabled:
1. New container is started
2. Health checks are performed on new container
3. If health checks pass, traffic is routed to new container
4. Old container is kept running for 60 seconds before shutdown
5. If health checks fail, new container is destroyed and old container remains active

This ensures your application remains available during deployments.

### Deployment Commands
Basic deployment flow:
```bash
git push dokku main
```

This triggers:
1. Build of new container
2. Health check verification
3. Zero-downtime container swap

## References
- [Zero Downtime Deploys](https://dokku.com/docs/deployment/zero-downtime-deploys/)
- [Application Deployment](https://dokku.com/docs/deployment/application-deployment/)
- [Process Management](https://dokku.com/docs/processes/process-management/)
