---
name: add-ticket-skill
description: 'Create well-formed GitHub tickets with best practices for any repository. Use when: adding features, infrastructure changes, bug fixes, or other tracked work.'
argument-hint: 'Ticket type (bug/feature/task), affected service(s), or leave blank for interactive setup'
user-invocable: true
---

# Add Ticket Skill

## When to Use

- **Feature Development**: Adding new functionality to any service or component
- **Infrastructure Changes**: Modifying configuration files, volumes, or deployment setups
- **Bug Fixes**: Addressing issues in existing services or deployment workflows
- **Technical Debt**: Refactoring or improving code/service reliability
- **Project Planning**: Creating backlog items for future work

## Core Skills

### 1. Ticket Creation Process

**Goal**: Create a GitHub Issue that follows repository best practices and contains all necessary information for developers to start working immediately.

#### Step 1: Define Ticket Type and Scope
- Identify ticket type: `bug`, `feature`, or `task` (dedicated issue-type field, separate from labels)
- Determine scope: affected service(s) or `both` if multiple services are touched
- Assess complexity briefly (optional; sizing and effort estimates are **ignored** per current user instruction)
- Ignore sizing/effort fields; do not include `size/*` labels or time estimates
- Check if this ticket references or depends on any existing tickets

#### Step 2: Gather Required Information
Before creating the ticket, ensure you have:
- Clear, descriptive title following the pattern `[Service]: Brief description`
- Detailed description including context and value addition
- Acceptance Criteria (checklist format)
- Appropriate labels (service-specific, type, complexity)
- Any references to related tickets by ID
- Links to relevant documentation or code files

#### Step 3: Create the GitHub Issue
Use the `gh` CLI or GitHub web interface to create the issue with:
- Proper title formatting
- Complete description body
- All relevant labels applied
- Assignee if known
- Project association (if moving to active sprint)

#### Step 4: Link and Prioritize
- Link to related tickets using `#<issue-number>` syntax
- Add to project board (default: backlog unless explicitly prioritized)
- Verify all required fields are present
- Notify stakeholders if needed

#### Step 5: Documentation
- Update any related documentation if required
- Reference the ticket in commit messages and PRs
- Ensure traceability from ticket → code → deployment

### 2. Label Taxonomy (Follow Repository Conventions)

Always apply these label categories:

**Service Labels** (choose at least one):
- `<service>`: Changes to a service or component (e.g., `backend`, `frontend`, `api`, `infra`)
- `both`: Affects multiple services
- `infra`: General infrastructure changes

**Type Labels** (choose from issue-type field; not labels):
- `bug`: Defect or regression
- `feature`: New functionality or enhancement
- `task`: Routine/work item

**Complexity / Size Labels** (choose one):
- `size/S`: Small (≤2 hours, well-understood)
- `size/M`: Medium (2-8 hours, may require research)
- `size/L`: Large (1-3 days, multiple components)
- `size/XL`: Extra Large (>3 days, high uncertainty or coordination)

**Separate Effort Estimate** (set independently of size; e.g., in description or project field):
- `2h`, `4h`, `8h`, `1d`, `3d`, `5d`, `10d`
- Size indicates complexity; estimate indicates actual projected effort

**Additional Labels** (as needed):
- `automation`: Related to CI/CD or automation
- `security`: Security focus
- `performance`: Performance optimization
- `dependencies`: External dependency updates
- `breaking`: Breaking change requiring migration

### 3. Size and Effort Guidelines

**Size / Complexity** (label):
- `size/S`: Small (≤2 hours, well-understood)
- `size/M`: Medium (2-8 hours, may require research)
- `size/L`: Large (1-3 days, multiple components)
- `size/XL`: Extra Large (>3 days, high uncertainty or coordination)

**Effort Estimate** (separate from size; set as text/field value):
- `≤2h`, `2-8h`, `1-3d`, `>3d`, or a specific number (e.g., `4h`, `3d`, `10d`)
- Size = complexity; Estimate = projected time

**Size/S (Small)**:
- Single file changes / simple fixes
- Complexity label: `size/S`
- Typical separate effort estimate: `≤2h`

**Size/M (Medium)**:
- Multiple related files / new feature with clear scope
- Complexity label: `size/M`
- Typical separate effort estimate: `2h` - `8h`

**Size/L (Large)**:
- Cross-service / significant feature / multi-component refactoring
- Complexity label: `size/L`
- Typical separate effort estimate: `1d` - `3d`

**Size/XL (Extra Large)**:
- Architectural / major refactoring / high uncertainty
- Complexity label: `size/XL`
- Typical separate effort estimate: `>3d` or `10d`

### 4. Ticket Structure Template

Every ticket should include these sections:

```
## Description
[Clear, concise explanation of what needs to be done and why]

## Context
[Background information, related systems, or references to other tickets/services]

## Value Addition
[Benefit or impact of completing this work]

## Acceptance Criteria
- [ ] Specific, measurable, testable criterion 1
- [ ] Specific, measurable, testable criterion 2
- [ ] ... (each criterion should be independently verifiable)

## References
- Related ticket: #<ticket-number>
- Related documentation: [link] or `docs/guide.md`
- Related code: `services/<service>/compose.yml` or `path/to/config.yml`
```

### 5. Backlog Placement Policy

By default, all newly created tickets should be placed in the **backlog** column of the project board unless:
- Explicitly requested to be moved to an active sprint (`To Do`, `In Progress`, etc.)
- Part of a planned sprint with established priorities
- Marked as a blocker for other high-priority work
- Flagged as urgent by product/project management

To move a ticket to active work, use the project board interface or:
```bash
gh project item-add <project-number> --owner <owner> --url "https://github.com/<owner>/<repo>/issues/<issue-number>" --position <column-name>
```

### 6. Cross-Referencing Best Practices

When tickets relate to each other:
- Always reference by issue number: `#<number>`
- Use bidirectional references when appropriate
- In parent/child relationships, mention in both tickets
- For blocking relationships, use: `Blocks: #<number>` or `Blocked by: #<number>`
- For duplicates, use: `Duplicate: #<number>` and close appropriately

### 7. Required Information Checklist

Before considering a ticket "ready to work", verify:
- [ ] Title follows `[service]: description` format
- [ ] Description explains what, why, and context
- [ ] Value addition is clear
- [ ] Acceptance Criteria are present and testable
- [ ] At least one service label is applied
- [ ] Issue type is set to `bug`, `feature`, or `task` (separate from labels)
- [ ] Issue type is set (`bug`, `feature`, `task`) via `--type` (not label)
- [ ] Size label applied (`size/S`, `size/M`, `size/L`, `size/XL`) — **ignored per user instruction; do not use**
- [ ] Separate effort estimate set (`2h`, `4h`, `1d`, etc.) — **ignored per user instruction; do not use**
- [ ] Type label (feature/bug/task) is distinct from service/complexity labels
- [ ] Exactly one size label is applied
- [ ] All references to other tickets use `#<number>` format
- [ ] No placeholder text or TODO items in description/AC
- [ ] Assignee is set if work should start immediately
- [ ] Linked to appropriate project column (backlog by default)

## Quick Start

### Interactive Ticket Creation

Use the provided helper script for guided ticket creation:
```bash
# From the repository root:
./add-ticket.sh
```

This will prompt you for:
1. Ticket title
2. Detailed description
3. Service(s) affected
4. Ticket type
5. Estimated size/complexity
6. Related ticket IDs (if any)
7. Acceptance criteria items
8. Whether to move to active sprint or keep in backlog

### Direct gh CLI Usage

For experienced users, create tickets directly:
```bash
# Example: Medium complexity feature for a service
# Replace <repo>, <service>, and <file-path> with your values
gh issue create --repo <owner>/<repo> \
  --title "<service>: Brief description" \
  --label "<service>,feature,size/M" \
  --body "## Description\nAdd feature details here.\n\n## Context\nRelated to ticket #<number> and deployment validation.\n\n## Value Addition\nBenefit of completing this work.\n\n## Acceptance Criteria\n- [ ] Specific, measurable criterion 1\n- [ ] Specific, measurable criterion 2\n\n## References\n- Related ticket: #<number>\n- Reference file: <path/to/config.yml>"
```

### Bulk Ticket Creation

For setting up multiple related tickets:
1. Create all tickets first without project assignment
2. Apply appropriate labels and sizing
3. Add cross-references between tickets
4. Link all to project board in bulk
5. Move prioritized tickets to active columns as needed

## Templates & References

| Resource | Use When |
|----------|----------|
| `./add-ticket.sh` | Interactive ticket creation helper |
| `.github/workflows/deploy.yml` | Understanding deployment context |
| `docs/guide.md` | Service reference documentation |
| `path/to/config.yml` | Service configuration reference |
| Repository guidance (e.g., `AGENTS.md`) | Agent instructions and best practices |
| Repository overview | Context and setup |
| A bulk-ticket script | Example of bulk ticket creation |

## Common Workflows

### Workflow A: Single Feature Ticket
```
1. Run ./add-ticket.sh or use gh issue create
2. Follow prompts for title, description, labels, size
3. Verify all required information is present
4. Create ticket (defaults to backlog)
5. Link to any related tickets
6. Notify assignee or team if urgent
```

### Workflow B: Infrastructure Improvement
```
1. Identify the infrastructure change needed
2. Create ticket with `infra` or specific service label
3. Add `size/L` or `size/XL` for significant changes
4. Include detailed Acceptance Criteria for testing
5. Reference related services and configuration files
6. Place in backlog for sprint planning
```

### Workflow C: Bug Fix with Reproduction Steps
```
1. Create ticket with `bug` label
2. Include clear reproduction steps in description
3. Add `size/S` or `size/M` based on fix complexity
4. Add Acceptance Criteria for verification
5. Reference any related error logs or monitoring alerts
6. Link to any feature tickets that introduced the bug
```

### Workflow D: Epic/Breakdown
```
1. Create parent epic ticket with `size/XL`
2. Create child tickets for each component (`size/S` or `size/M`)
3. Reference parent ticket in children: `Part of epic: #<parent-number>`
4. Reference children in epic: `Includes: #<child1>, #<child2>, ...`
5. Place epic in backlog, children in appropriate columns as ready
```

## Tips & Troubleshooting

**Q: What labels should I use if a ticket affects multiple services?**  
A: Use appropriate service labels for each affected service, or `both` if available. Add `size` label based on the combined work.

**Q: How do I reference a ticket in a different repository?**  
A: Use full URL: `https://github.com/other-org/other-repo/issues/<number>`

**Q: Should I estimate time in the description?**  
A: No - use the size labels (`size/S/M/L/XL`) instead of time estimates for consistency.

**Q: What if I'm not sure about the complexity?**  
A: Start with `size/M` and adjust after initial investigation. It's better to over-estimate slightly than under-estimate.

**Q: How do I handle tickets that require documentation updates?**  
A: Add the `documentation` label if it's docs-only work, or include documentation tasks in the Acceptance Criteria if it's part of a feature.

**Q: When should I create a ticket vs. just making a change?**  
A: Create a ticket for any work that: takes >15 minutes, affects multiple people, requires review, or needs tracking for auditing/compliance.

**Q: How do I handle urgent production issues?**  
A: Create the ticket immediately, add `priority/high` or similar label, notify on-call team, and move to `In Progress` column upon starting work.

## Next Steps

1. **Customize this skill** based on team feedback and evolving practices
2. **Integrate with project boards** to automate ticket movement based on labels
3. **Add validation scripts** to check ticket completeness before creation
4. **Create templates** for common ticket types (bug, feature, infra) in the repo
5. **Set up metrics** to track ticket cycle time and completion rates

---
