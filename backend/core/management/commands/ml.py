import cv2
import time
import ast
import numpy as np
import pandas as pd
import mediapipe as mp

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

# function to calculate angle
def calculate_angle(A, B, C):
    # Convert points to numpy arrays
    A = np.array(A)
    B = np.array(B)
    C = np.array(C)

   # Calculate the distances between points
    AB = np.linalg.norm(B - A)
    BC = np.linalg.norm(C - B)
    AC = np.linalg.norm(C - A)
    
    # Use the law of cosines to calculate the angle at point B
    radians = np.arccos((AB**2 + BC**2 - AC**2) / (2 * AB * BC))
    angle_degrees = np.degrees(radians)
    return angle_degrees

# function to get necessary keypoint for exercise/yoga # Pose == Workout
def get_imp_keypnt(Pose, dct, final_jnt_lst):
    final_dct = {}
    
    main_key_lst = list(dct.keys())
    for nm in main_key_lst:
        for i in final_jnt_lst:
            if nm in i:
                final_dct[i] = dct[nm]
    return final_dct 

# function to draw keypoints on frame
def draw(frame, results, final_jnt_lst, output):
    index = [final_jnt_lst[i] for i in range(len(output)) if output[i] == 0]
    # print(index) # ['LEFT-ELBOW']

    mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS, 
                              mp_drawing.DrawingSpec(color=(255, 255, 255), thickness=2, circle_radius=4),
                              mp_drawing.DrawingSpec(color=(255, 255, 255), thickness=2, circle_radius=4)
                              ) 
    # Extract landmarks
    landmarks = results.pose_landmarks.landmark

    for id, lm in enumerate(landmarks):
        h, w, c = frame.shape
        cx, cy = int(lm.x * w), int(lm.y * h)

        if (mp_pose.PoseLandmark(id).name).replace('_', '-') in index:
            cv2.circle(frame, (cx, cy), 3, (0, 0, 255), cv2.FILLED)
            continue
        
        cv2.circle(frame, (cx, cy), 3, (0, 255, 0), cv2.FILLED)

    return frame

# function to calculate coordinate
def calculate_coordinate_angle(row, angle_dct_info, results):
    row['LEFT_PERPENDICULAR_POINT'] = {'x': results.pose_landmarks.landmark[23].x,
                                 'y': results.pose_landmarks.landmark[11].y}
    row['RIGHT_PERPENDICULAR_POINT'] = {'x': results.pose_landmarks.landmark[24].x,
                                 'y': results.pose_landmarks.landmark[12].y}
    angle = {}
    for j in angle_dct_info:
        a = angle_dct_info[j][0]
        b = angle_dct_info[j][1]
        c = angle_dct_info[j][2]
        # print(j)
        a_coordinate = [row[a].x,row[a].y]
        b_coordinate = [row[b].x,row[b].y]
        if c=='LEFT_PERPENDICULAR_POINT':
            c_coordinate = [row['LEFT_PERPENDICULAR_POINT']['x'],row['LEFT_PERPENDICULAR_POINT']['y']]
        elif c=='RIGHT_PERPENDICULAR_POINT':
            c_coordinate = [row['RIGHT_PERPENDICULAR_POINT']['x'],row['RIGHT_PERPENDICULAR_POINT']['y']]
        else:
            c_coordinate = [row[c].x,row[c].y]

        angl_val = calculate_angle(a_coordinate,b_coordinate,c_coordinate)
        angle[j] = angl_val
    return angle

# detecting position
def media(img):
    pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
    
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Make detection on cropped frame
    results = pose.process(img)

    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    return results


def main(dictionary): # video = blob.data

    pose_name = dictionary['POSE'].lower().replace(" ", '')

    # range of angles for execise
    angle_joint_range = {
        pose_name : {
            'LEFT-ANKLE' : dictionary['LEFT_ANKLE_AR'], 
            'RIGHT-ANKLE' : dictionary['RIGHT_ANKLE_AR'], 
            'LEFT-KNEE' : dictionary['LEFT_KNEE_AR'], 
            'RIGHT-KNEE' : dictionary['RIGHT_KNEE_AR'], 
            'HIP' : dictionary['HIP_AR'], 
            'LEFT-TORSO' : dictionary['LEFT_TORSO_AR'], 
            'RIGHT-TORSO' : dictionary['RIGHT_TORSO_AR'], 
            'LEFT-SHOULDER' : dictionary['LEFT_SHOULDER_AR'], 
            'RIGHT-SHOULDER' : dictionary['RIGHT_SHOULDER_AR'], 
            'LEFT-ELBOW' : dictionary['LEFT_ELBOW_AR'], 
            'RIGHT-ELBOW' : dictionary['RIGHT_ELBOW_AR'], 
            'LEFT-WRIST' : dictionary['LEFT_WRIST_AR'], 
            'RIGHT-WRIST' : dictionary['RIGHT_WRIST_AR']
        }
    }

    workout =  pose_name
    user_height = 180
    align = dictionary['ORIENTATION']


    dct = {
    'KNEE': dictionary['KNEE'], 
     'HIP': dictionary['HIP'], 
     'TORSO': dictionary['TORSO'], 
     'SHOULDER': dictionary['SHOULDER'], 
     'ELBOW': dictionary['ELBOW'], 
     'ANKLE': dictionary['ANKLE'], 
     'NECK': dictionary['NECK'], 
     'WRIST': dictionary['WRIST']
     }
    
    for i in angle_joint_range[pose_name]:
        angle_joint_range[pose_name][i] = ast.literal_eval(angle_joint_range[pose_name][i])


    # joints required to find the angleof a joint
    angle_dct_info = { 'LEFT-ANKLE': ['LEFT_FOOT_INDEX','LEFT_ANKLE','LEFT_KNEE'],
                'RIGHT-ANKLE': ['RIGHT_FOOT_INDEX','RIGHT_ANKLE','RIGHT_KNEE'],
                'LEFT-KNEE': ['LEFT_HIP','LEFT_KNEE','LEFT_ANKLE'],
                'RIGHT-KNEE': ['RIGHT_HIP','RIGHT_KNEE','RIGHT_ANKLE'],
                'HIP': ['LEFT_KNEE','LEFT_HIP','LEFT_SHOULDER'],
                'LEFT-TORSO':	['LEFT_SHOULDER','LEFT_HIP','LEFT_PERPENDICULAR_POINT'],
                'RIGHT-TORSO':	['RIGHT_SHOULDER','RIGHT_HIP','RIGHT_PERPENDICULAR_POINT'],
                'LEFT-SHOULDER': ['LEFT_HIP','LEFT_SHOULDER','LEFT_ELBOW'],
                'RIGHT-SHOULDER': ['RIGHT_HIP','RIGHT_SHOULDER','RIGHT_ELBOW'],
                'LEFT-ELBOW': ['LEFT_WRIST','LEFT_ELBOW','LEFT_SHOULDER'],
                'RIGHT-ELBOW': ['RIGHT_WRIST','RIGHT_ELBOW','RIGHT_SHOULDER'],		
                'LEFT-WRIST':	['LEFT_INDEX','LEFT_WRIST','LEFT_ELBOW'],
                'RIGHT-WRIST': ['RIGHT_INDEX','RIGHT_WRIST','RIGHT_ELBOW']
                }
    final_jnt_lst = list(angle_dct_info.keys())

    cap = cv2.VideoCapture(0)
    # cap = cv2.VideoCapture(video)


    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
                print('Null.Frame')
                break

        # height, width of frame
        frame_height, frame_width = frame.shape[:2]

        # calculating rectangle height and width  according to the frame
        x_center = frame_width // 2
        y_center = frame_height // 2
        rect_height = int(frame_height - (frame_height * 0.30)) # 30% of the frame
        rect_width = int(frame_width - (frame_width * 0.30)) # 30% of the frame
            
        # adjusting the height, width according to user's height and alignment
        if align == 'V':
            rect_height = int(frame_height - (frame_height * 0.30) + (user_height ))
        elif align == 'H':
            rect_width = int(frame_width - (frame_width * 0.30) + (user_height ))
    

        # calculating top-left and bottom-right corner
        top_left_x = max(0, x_center - rect_width // 2)
        top_left_y = max(0, y_center - rect_height // 2) 
        bottom_right_x = min(frame_width, top_left_x + rect_width)
        bottom_right_y = min(frame_height, top_left_y + rect_height)

        # drawing rectangle
        cv2.rectangle(frame, (top_left_x, top_left_y), (bottom_right_x, bottom_right_y), (0, 255, 0),thickness=2)

        """detecting whether there is a person in box or not"""
        # cropped frame
        cropped_frame = frame[top_left_y:top_left_y+rect_height, top_left_x:top_left_x+rect_width]
            
        # Make detection on cropped frame
        results = media(cropped_frame)

        # checking whether there is a person or not
        if not results.pose_landmarks: # there is no person inside
            text = 'Get inside...'
            cv2.putText(frame, text, (top_left_x, top_left_y - 3), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
        else:
            # list of keypoints detected inside the box
            detected_keypoints = {}
            for i, value in enumerate(results.pose_landmarks.landmark):
                detected_keypoints[mp_pose.PoseLandmark(i).name] = value    

            # extracting required keypoints from the database
            response = get_imp_keypnt(workout.lower(), dct, final_jnt_lst)
            required_keypoints = []

            # mapping main keys 
            for keypnt in response:
                if response[keypnt] == 1:
                    lst = angle_dct_info[keypnt]
                    if lst[0] not in required_keypoints:
                        required_keypoints.append(lst[0])
                    if lst[1] not in required_keypoints:
                        required_keypoints.append(lst[1])
                    if lst[2] not in required_keypoints:
                        required_keypoints.append(lst[2])

            if 'LEFT_PERPENDICULAR_POINT' in required_keypoints:
                required_keypoints.remove('LEFT_PERPENDICULAR_POINT')
            if 'RIGHT_PERPENDICULAR_POINT' in required_keypoints:
                required_keypoints.remove('RIGHT_PERPENDICULAR_POINT')

            check = all( pnt in list(detected_keypoints.keys()) for pnt in required_keypoints)

            if not check: # checking if person is inside properly or not
                text = 'Adjust position'
                cv2.putText(frame, text,(top_left_x, top_left_y - 3), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
                print("do it again")
            else:
                text = 'Perfect Buddy......'
                cv2.putText(frame, text,(top_left_x, top_left_y - 3), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
                    
                # calculating angle on video feed
                angle = calculate_coordinate_angle(detected_keypoints, angle_dct_info, results)
                    
                output = []

                for i in final_jnt_lst:
                    if (angle[i] >= angle_joint_range[workout][i][0]) and angle[i] <= angle_joint_range[workout][i][-1]:
                        output.append(1) # Correct
                    else:
                        output.append(0) # Incorrect
                    
                # drawing connection lines
                cropped_frame = draw(cropped_frame, results, final_jnt_lst, output)    

        cv2.imshow('Mediapipe Feed', frame)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    main()