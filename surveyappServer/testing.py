import sys, json

def main():
    lines = sys.stdin.readlines()
    data = json.loads(lines)
    print(json.dumps(data))

    sys.stdout.flush()

if __name__ == '__main__':
    main()