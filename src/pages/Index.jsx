import React, { useState } from "react";
import { Box, Heading, Text, Button, Input, Textarea, Select, Progress, Flex, Spacer, IconButton, Table, Thead, Tbody, Tr, Th, Td, Link, FormControl, FormLabel } from "@chakra-ui/react";
import { FaPlus, FaClock, FaVideo } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", category: "", deadline: "", progress: 0 });
  const [timeCard, setTimeCard] = useState({ clockedIn: false, startTime: null, endTime: null });
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ name: "", startTime: null, endTime: null });
  const [newMeeting, setNewMeeting] = useState({ title: "", date: "", recordingUrl: "" });
  const [meetings, setMeetings] = useState([
    { id: 1, title: "Meeting 1", date: "2023-06-01", recordingUrl: "https://example.com/meeting1" },
    { id: 2, title: "Meeting 2", date: "2023-06-05", recordingUrl: "https://example.com/meeting2" },
  ]);

  const handleTaskChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const addTask = () => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ title: "", description: "", category: "", deadline: "", progress: 0 });
  };

  const updateTaskProgress = (id, progress) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, progress } : task)));
  };

  const clockIn = () => {
    setTimeCard({ clockedIn: true, startTime: new Date(), endTime: null });
  };

  const clockOut = () => {
    setTimeCard({ ...timeCard, clockedIn: false, endTime: new Date() });
  };

  const startActivity = () => {
    setNewActivity({ ...newActivity, startTime: new Date() });
  };

  const endActivity = () => {
    setActivities([...activities, { ...newActivity, endTime: new Date() }]);
    setNewActivity({ name: "", startTime: null, endTime: null });
  };

  const handleNewMeetingChange = (e) => {
    setNewMeeting({ ...newMeeting, [e.target.name]: e.target.value });
  };

  const addMeeting = () => {
    setMeetings([...meetings, { ...newMeeting, id: Date.now() }]);
    setNewMeeting({ title: "", date: "", recordingUrl: "" });
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Student Organization Management
      </Heading>

      <Box mb={8}>
        <Heading as="h2" size="lg" mb={2}>
          Task Management
        </Heading>
        <Flex mb={2}>
          <Input name="title" placeholder="Task Title" value={newTask.title} onChange={handleTaskChange} mr={2} />
          <Select name="category" placeholder="Category" value={newTask.category} onChange={handleTaskChange} mr={2}>
            <option value="general">General</option>
            <option value="event">Event</option>
            <option value="marketing">Marketing</option>
          </Select>
          <Input name="deadline" placeholder="Deadline" value={newTask.deadline} onChange={handleTaskChange} mr={2} />
          <IconButton icon={<FaPlus />} onClick={addTask} />
        </Flex>
        <Textarea name="description" placeholder="Task Description" value={newTask.description} onChange={handleTaskChange} mb={4} />
        {tasks.map((task) => (
          <Box key={task.id} mb={4} p={4} borderWidth={1} borderRadius="md">
            <Flex align="center" mb={2}>
              <Heading as="h3" size="md">
                {task.title}
              </Heading>
              <Spacer />
              <Text>{task.category}</Text>
            </Flex>
            <Text mb={2}>{task.description}</Text>
            <Text mb={2}>Deadline: {task.deadline}</Text>
            <Progress value={task.progress} mb={2} />
            <Button size="sm" onClick={() => updateTaskProgress(task.id, task.progress + 10)} isDisabled={task.progress === 100}>
              Update Progress
            </Button>
          </Box>
        ))}
      </Box>

      <Box mb={8}>
        <Heading as="h2" size="lg" mb={2}>
          Time Card for Remote Work
        </Heading>
        {timeCard.clockedIn ? (
          <Button onClick={clockOut} leftIcon={<FaClock />}>
            Clock Out
          </Button>
        ) : (
          <Button onClick={clockIn} leftIcon={<FaClock />}>
            Clock In
          </Button>
        )}
        {timeCard.endTime && (
          <Text mt={2}>
            Clocked In: {timeCard.startTime.toLocaleString()} | Clocked Out: {timeCard.endTime.toLocaleString()}
          </Text>
        )}
      </Box>

      <Box mb={8}>
        <Heading as="h2" size="lg" mb={2}>
          Activity Time Measurement
        </Heading>
        <Flex mb={2}>
          <Input placeholder="Activity Name" value={newActivity.name} onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })} mr={2} />
          {newActivity.startTime ? <Button onClick={endActivity}>End Activity</Button> : <Button onClick={startActivity}>Start Activity</Button>}
        </Flex>
        <Table>
          <Thead>
            <Tr>
              <Th>Activity</Th>
              <Th>Start Time</Th>
              <Th>End Time</Th>
              <Th>Duration</Th>
            </Tr>
          </Thead>
          <Tbody>
            {activities.map((activity, index) => (
              <Tr key={index}>
                <Td>{activity.name}</Td>
                <Td>{activity.startTime.toLocaleString()}</Td>
                <Td>{activity.endTime.toLocaleString()}</Td>
                <Td>{((activity.endTime - activity.startTime) / 1000 / 60).toFixed(2)} minutes</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Box mb={8}>
        <Heading as="h2" size="lg" mb={2}>
          Record New Meeting
        </Heading>
        <FormControl id="meetingTitle" mb={2}>
          <FormLabel>Meeting Title</FormLabel>
          <Input name="title" placeholder="Meeting Title" value={newMeeting.title} onChange={handleNewMeetingChange} />
        </FormControl>
        <FormControl id="meetingDate" mb={2}>
          <FormLabel>Meeting Date</FormLabel>
          <Input name="date" placeholder="Meeting Date" value={newMeeting.date} onChange={handleNewMeetingChange} />
        </FormControl>
        <FormControl id="recordingUrl" mb={2}>
          <FormLabel>Recording URL</FormLabel>
          <Input name="recordingUrl" placeholder="Recording URL" value={newMeeting.recordingUrl} onChange={handleNewMeetingChange} />
        </FormControl>
        <Button onClick={addMeeting}>Add Meeting</Button>
      </Box>

      <Box>
        <Heading as="h2" size="lg" mb={2}>
          Recorded Meeting Playback
        </Heading>
        {meetings.map((meeting) => (
          <Box key={meeting.id} mb={4}>
            <Flex align="center">
              <IconButton icon={<FaVideo />} mr={2} />
              <Link href={meeting.recordingUrl} isExternal>
                {meeting.title}
              </Link>
              <Spacer />
              <Text>{meeting.date}</Text>
            </Flex>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Index;
