import unittest
from app import app

class TestPreschoolApp(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_routes(self):
        routes = [
            '/',
            '/about-us',
            '/our-programs',
            '/senior-kg',
            '/admissions',
            '/franchise',
            '/branches',
            '/media',
            '/stories',
            '/contact-us',
            '/careers'
        ]
        for route in routes:
            with self.subTest(route=route):
                response = self.app.get(route)
                self.assertEqual(response.status_code, 200, f"Route {route} failed with status {response.status_code}")
                print(f"Route {route} -> 200 OK")

if __name__ == '__main__':
    unittest.main()
