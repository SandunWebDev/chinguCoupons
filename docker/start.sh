# Starting server in background. 
# NOTE: That "&" is used to run this command in background so below commands can be run.
npm run server &

# Add mock data to the server.
chmod +x ./docker/helpers/waitFor
./docker/helpers/waitFor localhost:$PORT --timeout=10 --strict -- curl localhost:$PORT/api/debug/addMockData

# Keep container running
tail -f /dev/null