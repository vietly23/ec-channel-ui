import unittest
import sqlite3
import sys
import os
import inspect

from EnergyChannel import SQLiteHelper

class TestSQLiteHelper(unittest.TestCase):
    def setUp(self) -> None:
        self.db = SQLiteHelper(self.path)

    def tearDown(self) -> None:
        self.db.close()

    def testInitialization(self) -> None:
        self.assertTrue(os.path.isfile(self.path))

    def testGetRecentRows(self) -> None:
        time = 132150
        data = self.db.getRecentRows(time)
        self.assertEqual(data[0][1:], self.testData[-1])
        self.assertEqual(data[1][1:], self.testData[-2])

    def testGetLastEntries(self) -> None:
        data = self.db.getLastNrows(3)
        for actual,expected in zip(data, self.testData[-1:1:-1]):
            self.assertEqual(actual[1:], expected)

    @classmethod
    def setUpClass(cls) -> None:
        path = os.path.join(os.path.dirname(inspect.stack()[0][1]),'test.db')
        cls.path = path
        db = SQLiteHelper(path)
        testData = [ (1222, 13, 12, 132130),
                     (1231, 12, 41, 132140),
                     (1231, 12, 41, 132160),
                     (1231, 12, 41, 132161)
                    ]
        cls.testData = testData
        for row in testData:
            db.insertData(row)
        db.close()

    @classmethod    
    def tearDownClass(cls) -> None:
        os.remove(cls.path)

