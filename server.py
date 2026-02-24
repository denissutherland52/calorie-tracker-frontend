from flask import Flask, jsonify, send_from_directory
import csv
import os

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

@app.route('/api/calories')
def get_calories():
    try:
        log_path = os.path.expanduser('~/.openclaw/agents/bri/workspace/DIET_LOG.csv')
        with open(log_path, 'r') as f:
            reader = csv.reader(f)
            # Assuming the calorie count is in the last row, second column
            for row in reversed(list(reader)):
                if row: # skip empty rows
                    calories = row[1]
                    return jsonify({'calories': calories})
            return jsonify({'calories': 'N/A'})
    except (IOError, IndexError) as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)