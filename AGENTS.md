# AGENTS.md

Guidelines for AI coding agents working in this React Native codebase.

## Skills

This project includes specialized skills for common tasks:

- `/create-component` - Create new UI components following project conventions
- `/create-service` - Create new services with factory pattern
- `/create-module` - Create new feature modules with Clean Architecture

Use `@code-reviewer` agent for code reviews focusing on project conventions.

## Code Patterns

For detailed code patterns, refer to:

- Component structure: Load skill `create-component` when creating components
- Service pattern: Load skill `create-service` when creating services
- Module structure: Load skill `create-module` when creating modules

## Notes

- Default export is used for services (factory pattern)
- Named exports for components and hooks
- Do not add comments unless explicitly requested
- Spanish is used in UI strings and validation messages
