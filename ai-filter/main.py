from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "AI Filter Service running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
