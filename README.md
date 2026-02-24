# Calorie Tracker

A simple static web application to display the latest calorie count from a CSV file, designed for hosting on GitHub Pages.

## How to use

1.  **Update the data:**
    - Run the `update-data.js` script to fetch the latest calorie data from your `DIET_LOG.csv` and generate the `public/data.json` file.
    ```bash
    node update-data.js
    ```

2.  **Commit and push the changes:**
    - Commit the updated `public/data.json` file to your repository.
    ```bash
    git add public/data.json
    git commit -m "Update calorie data"
    git push
    ```

## GitHub Pages Setup

1.  Go to your repository's **Settings**.
2.  In the **Pages** section, select the `main` branch (or your default branch) and the `/public` folder as the source.
3.  Save your changes. Your calorie tracker will be live at `https://<your-username>.github.io/<your-repo-name>/`.
