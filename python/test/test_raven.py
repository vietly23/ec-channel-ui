import unittest
import xml.etree.ElementTree as ET
from EnergyChannel import Raven

    
class TestRavenClass(unittest.TestCase):

    def testCommandTemplate(self) -> None:
        test_obj = Raven() 
        expected = '<Command><Name>initialize</Name></Command>'.encode('ascii')
        actual = ET.tostring(test_obj._commandTemplate({'Name':'initialize'}))
        self.assertEqual(actual, expected, 'Template is off? Please double check.')

if __name__ == '__main__':
    unittest.main()
