import maya.cmds as cmds
import json

def light2scene():
    result = []
    lights = cmds.ls(sl = True)
    for light in lights:
        data = {
            'uid': "",
            'type': 'DirectionalLight'
            'name': light
        }
        data['matrix'] = cmds.xform(light, q = True, m = True, a = True)
        result.append(data)
    print result
if __name__ == "__main__":
    light2scene()