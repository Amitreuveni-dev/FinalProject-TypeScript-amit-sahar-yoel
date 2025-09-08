# Student Code Evaluation Instructions for Claude

## Overview
This document provides step-by-step instructions for evaluating student contributions in a group programming project using Git history analysis and code review.

Please take into account that they are students in after 4 months of learning. They have 2 classes, each of 5 academic hours, at the evening. they came without any prior programming experience. so evaluate their level accordingly.
They are using single file, because that is the technology they have learned so far.

**CRITICAL EVALUATION GUIDELINES FOR BEGINNER STUDENTS:**
- Do NOT criticize practices that are appropriate for their learning level
- Do NOT expect advanced features they haven't learned yet
- Compare them to other students at their exact same learning stage (4 months, no prior experience)
- Focus on what they HAVE achieved rather than what they haven't learned yet
- Only mark something as a weakness if it's genuinely poor for their level, not if it's simply basic/beginner-appropriate
- Recognize that basic implementations are impressive achievements for 4-month students


## Project Requirements (Level 1 - Light)
**The students were assigned to:**
Build an app with MVC and OOP principles.
Use design procedures like BEM, flowchart and interfaces.
Open a new repo and work with branches.

**Level 1 (Light) Requirements:**
- A store with products and a user cart
- Admin can add products
- User can add products to the cart

**Alternative Levels Available:**
- Level 2 (Medium): Simple game with animations
- Level 3 (Hard): 2D or 3D game with advanced animations, scoring

**Important Technology Context:**
- Students are limited to single-file implementations as that's the technology level they've learned
- They may have multiple TypeScript/SCSS files but the architecture is still relatively simple
- Advanced MVC separation into complex folder structures is beyond their current learning level

## Prerequisites
- Access to the student's Git repository
- The grading rubric/criteria document
- Project requirements specification (above)

## Step-by-Step Evaluation Process

### Step 1: Gather Repository Information
```bash
# Get list of all contributors
git log --all --format='%aN' | sort -u

# Get contribution statistics
git shortlog -sn --all

# Check current branch and status
git status
git branch -a
```

### Step 2: Identify Contributors
1. List all unique contributors found in the repository
2. **ASK THE INSTRUCTOR**: "What are the real names of these contributors?"
   - Format: `[Git username]: ?`
3. Wait for real names before proceeding with detailed evaluation

### Step 3: Analyze Individual Contributions

#### For Each Contributor, Execute:

##### A. Quantitative Analysis
```bash
# Get commit count and history
git log --author="[contributor_name]" --oneline --all

# Get list of files modified
git log --author="[contributor_name]" --stat --format="" --all | grep -E "^\s+\S+" | sed 's/|.*//g' | awk '{print $1}' | sort -u

# Get detailed changes for specific commits
git show --stat [commit_hash]
git diff [commit_hash]^ [commit_hash]
```

##### B. Qualitative Analysis
Read the actual files to assess code quality:
1. **Check main project files** (index.html, main TypeScript/JavaScript files, styles)
2. **Evaluate against specific project requirements**:
   - **Level 1 Functionality**: Store with products, user cart, admin can add products
   - **MVC Pattern**: Basic separation appropriate for their level (not expecting complex folder structure)
   - **OOP Principles**: Use of classes, constructors, methods appropriate for beginners
   - **BEM Methodology**: Block-Element-Modifier CSS naming convention
   - **Git Workflow**: Proper use of branches, meaningful commit messages
   - **TypeScript Usage**: Basic typing and class implementation
   - **Design Procedures**: Evidence of planning (interfaces, basic flowchart thinking)

### Step 4: Create Evaluation Categories

For each student, assess the following areas:

#### 1. Technical Excellence (40% weight)
**Evaluate based on project requirements:**
- **Level 1 Functionality**: Store works, cart functions, admin can add products
- **MVC Implementation**: Basic separation (even if in single file or simple structure)
- **OOP Principles**: Use of classes, constructors, methods (appropriate for beginner level)
- **BEM Methodology**: Proper CSS naming convention implementation
- **TypeScript Usage**: Basic typing, class definitions, interfaces where applicable
- **Code Quality**: Readable, organized code appropriate for 4-month learning level

**Scoring Guide:**
- Excellent (36-40): All Level 1 requirements met, good MVC/OOP/BEM for beginner level
- Good (28-35): Most requirements met, decent implementation of principles
- Fair (20-27): Basic functionality works, some principles implemented
- Poor (0-19): Missing key requirements or major implementation issues

#### 2. Team Collaboration (30% weight)
**Evaluate:**
- **Contribution Volume**: Percentage of overall commits
- **Git Practices**: Commit message quality, branch usage
- **Code Integration**: How well their code works with teammates'
- **Consistency**: Regular contribution pattern

**Scoring Guide:**
- Excellent (27-30): Equal contribution, excellent Git practices
- Good (21-26): Good contribution, decent Git practices
- Fair (15-20): Moderate contribution, basic Git usage
- Poor (0-14): Minimal contribution, poor Git practices

#### 3. User Experience (30% weight)
**Evaluate:**
- **Functionality**: Features work as intended
- **Design/UI**: Visual appeal and usability
- **Responsiveness**: Works across devices
- **Performance**: Efficient code execution

**Scoring Guide:**
- Excellent (27-30): Fully functional, polished experience
- Good (21-26): Mostly functional, good experience
- Fair (15-20): Basic functionality, acceptable experience
- Poor (0-14): Non-functional or poor experience

### Step 5: Determine Code Level

Classify each student into one of these levels:

#### **Expert**
- Masters advanced patterns (dependency injection, design patterns)
- Writes highly maintainable, scalable code
- Implements complex algorithms efficiently
- Mentors others effectively

#### **Advanced**
- Implements full MVC architecture correctly
- Uses TypeScript advanced features (generics, decorators)
- Writes clean, well-documented code
- Handles edge cases and errors properly

#### **Intermediate**
- Understands basic architecture patterns
- Uses TypeScript/JavaScript effectively
- Creates functional features with some bugs
- Shows good file organization

#### **Beginner-Intermediate**
- Basic understanding of programming concepts
- Can create simple features
- Some bugs and incomplete implementations
- Learning proper practices

#### **Beginner**
- Minimal programming knowledge
- Very basic or no functional contributions
- Needs significant guidance
- Learning fundamentals

### Step 6: Create Evaluation Files

#### File 1: CONTRIBUTOR_EVALUATION.md
Create a comprehensive evaluation with:

```markdown
# Contributor Evaluation Report

## Evaluation Summary Table
| Contributor | Real Name | Code Level | Overall Score | Grade |

## Detailed Individual Evaluations

### 👤 Contributor: [Git username]
**Real Name**: [Actual name]
**Code Level**: [Level from Step 5]
**Overall Score**: [XX/100]

#### Technical Excellence (40% weight) - Score: XX/40
**Strengths:**
- ✅ [Specific positive points with examples]

**Weaknesses:**
- ❌ [Specific areas needing improvement]

#### Team Collaboration (30% weight) - Score: XX/30
[Similar format]

#### User Experience (30% weight) - Score: XX/30
[Similar format]

**Recommendations for Improvement:**
1. [Specific, actionable advice]
```

#### File 2: CONTRIBUTORS.md
Create a summary file with:
- Project overview
- Contribution statistics
- Role identification
- Code samples showing quality level

### Step 7: Grade Calculation

#### Project Level Scoring System:
**IMPORTANT**: Maximum possible scores are based on chosen difficulty level:

- **Level 1 (Light)** - Store with products and cart: **Maximum 90/100 points**
- **Level 2 (Medium)** - Simple game with animations: **Maximum 95/100 points**  
- **Level 3 (Hard)** - 2D/3D game with advanced features: **Maximum 100/100 points**

**Scoring Process:**
1. Students earn component scores normally (Technical Excellence /40, Team Collaboration /30, User Experience /30)
2. Raw total score is calculated (up to 100 points possible)
3. **Final score is capped based on project difficulty level**
4. Letter grades are assigned based on the standard 100-point scale (not relative to the cap)

#### Grading Scale (Standard 100-Point Scale):
- **A** (90-100): Exceptional work exceeding requirements
- **B** (80-89): Good work meeting most requirements
- **C** (70-79): Satisfactory work meeting basic requirements
- **D** (60-69): Below average, missing key requirements
- **F** (0-59): Failing to meet minimum requirements

**Critical Grading Impact:** Project difficulty level caps directly limit achievable letter grades:

- **Level 1 (Light)**: Maximum 90/100 points → **Cannot achieve Grade A** (requires 90+ points)
- **Level 2 (Medium)**: Maximum 95/100 points → **Can achieve Grade A, but limited to 95/100 maximum**  
- **Level 3 (Hard)**: Maximum 100/100 points → **Can achieve full Grade A range (90-100)**

**This means:**
- Level 1 students can only earn grades B, C, D, or F
- Level 2 students can earn Grade A, but only up to 95/100
- Only Level 3 students can earn the full 90-100 Grade A range

**Example for Level 1:**
- Student earns: Technical Excellence (35/40) + Team Collaboration (25/30) + User Experience (28/30) = 88/100 raw score
- Level 1 cap: Student score stays at 88/100 (under the 90-point maximum)  
- Final grade: 88/100 = **Grade B** 
- **Important:** Even perfect Level 1 execution (40+30+30 = 100 raw points) would be capped at 90/100 = **Grade B**

This grading system incentivizes students to choose more challenging projects if they want to achieve Grade A.

### Step 8: Provide Actionable Feedback

For each student, include:
1. **3-5 specific strengths** with code examples
2. **3-5 specific weaknesses** with explanations
3. **5 concrete recommendations** for improvement
4. **Resources or topics** to study

### Step 9: Team Assessment

Evaluate the project as a whole:
1. **Completion percentage** of chosen level
2. **Missing requirements** list
3. **Team dynamics** assessment
4. **Project improvement priorities**

## Special Considerations

### Red Flags to Note:
- Single contributor doing 80%+ of work
- Commits only at project deadline
- Copy-pasted code without understanding
- No meaningful commit messages
- Broken or non-functional code

### Positive Indicators:
- Regular commit pattern
- Descriptive commit messages
- Code reviews via pull requests
- Clear task distribution
- Progressive feature development

## Output Files Structure

```
project_root/
├── CONTRIBUTOR_EVALUATION.md  # Detailed individual assessments
├── CONTRIBUTORS.md            # Repository contribution analysis
└── EVALUATION_INSTRUCTIONS.md # This file (for future use)
```

## Example Evaluation Workflow

```bash
# 1. Initial repository analysis
git status
git log --oneline -10

# 2. Get contributors
git log --all --format='%aN' | sort -u

# 3. Ask for real names
"What are the real names of these contributors?"

# 4. Analyze each contributor
for contributor in "name1" "name2" "name3"; do
    git log --author="$contributor" --oneline
    git log --author="$contributor" --stat
done

# 5. Read key files
# Read TypeScript/JavaScript files
# Read HTML structure
# Read CSS/SCSS organization

# 6. Create evaluation files
# Generate CONTRIBUTOR_EVALUATION.md
# Generate CONTRIBUTORS.md
```

## Important Notes

1. **Always ask for real names** before creating final evaluation
2. **Be specific** in feedback - avoid generic comments
3. **Provide evidence** - reference specific files and line numbers
4. **Be constructive** - focus on improvement paths
5. **Check for plagiarism** - unusual code style changes may indicate copied code
6. **Consider context** - beginner vs advanced course expectations

## Evaluation Checklist

- [ ] Retrieved all contributor usernames
- [ ] Obtained real names from instructor
- [ ] Analyzed commit history for each contributor
- [ ] Reviewed actual code quality
- [ ] Assessed against project requirements
- [ ] Calculated scores for each category
- [ ] Provided specific feedback and recommendations
- [ ] Created comprehensive evaluation files
- [ ] Included project-wide assessment
- [ ] Suggested improvement priorities

---

**Remember**: The goal is to provide fair, comprehensive, and constructive evaluation that helps students understand their current level and how to improve.