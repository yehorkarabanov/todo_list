import pytest
from app.main import app
from fastapi.testclient import TestClient


@pytest.fixture(scope="module")
def test_app():
    with TestClient(app) as test_client:
        # testing
        yield test_client
