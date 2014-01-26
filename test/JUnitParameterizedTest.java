package com.dell.sonicwall.sdar.tsr.module;

import java.util.Arrays;
import java.util.Collection;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

@RunWith(Parameterized.class)
public class JUnitParameterizedTest {
    private int sum;

    private int a;

    private int b;

    @Parameters
    public static Collection<Object[]> data() {
        return Arrays.asList(new Object[][] { new Object[] { 2, 1, 1 }, new Object[] { 4, 2, 2 } });
    }

    public JUnitParameterizedTest(int sum, int a, int b) {
        this.sum = sum;
        this.a = a;
        this.b = b;
    }

    @Test
    public void createPersonWithName() {
        System.out.print(sum);
        System.out.print('\t');
        System.out.print(a);
        System.out.print('\t');
        System.out.println(b);
    }
}