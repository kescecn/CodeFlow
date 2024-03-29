package com.zavrsnirad.CodeFlow.domain;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "TEST_CASE")
public class TestCase extends TimeAndUser{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "test_case_id")
    private Long testCaseId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "task_id", referencedColumnName = "task_id")
    private Task task;

    @Column(name = "input_data")
    private String input;

    @Column(name = "output_data", nullable = false)
    private String output;

    public TestCase() {
    }

    public TestCase(String input, String output) {
        this.input = input;
        this.output = output;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Long getTestCaseId() {
        return testCaseId;
    }

    public void setTestCaseId(Long testCaseId) {
        this.testCaseId = testCaseId;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TestCase testCase = (TestCase) o;
        return Objects.equals(testCaseId, testCase.testCaseId) && Objects.equals(task, testCase.task) && Objects.equals(input, testCase.input) && Objects.equals(output, testCase.output);
    }

    @Override
    public int hashCode() {
        return Objects.hash(testCaseId, task, input, output);
    }
}
