## Two Pointers Introduction

- Two pointers is a common interview technique often used to solve certain problems involving an iterable data structure, such as an array.
- As the name suggests, this technique uses two (or more) pointers that traverse through the structure.
- Generally speaking, a two pointer algorithm has these characteristics:
    - Two moving pointers, regardless of directions, moving dependently or independently;
    - A function that utilizes the entries referenced by the two pointers, which relates to the answer in a way;
    - An easy way of deciding which pointer to move;
    - A way to process the array when the pointers are moved.

**Classifications**

**Same Directions**
1- remove duplicates
2- middle of a linked list
3- move zeros

**Opposite Directions**
1- Two Sum Sorted
2- Valid Palindrome
3- Container with most water

## Same Directions

1. **Remove duplicates**
- Given a sorted list of numbers, remove duplicates and return the new length. You must do this in-place and without using extra memory.
- Input: [0, 0, 1, 1, 1, 2, 2].
- Output: 3.
- Your function should modify the list in place so that the first three elements become 0, 1, 2. Return 3 because the new length is 3.

```js
function removeDuplicates(arr) {
    if (arr.length === 0) {
        return 0;
    }
    let slow = 0;
    for (let fast = 1; fast < arr.length; fast++) {
        if (arr[fast] !== arr[slow]) {
            slow++;
            arr[slow] = arr[fast];
        }
    }
    return arr.slice(0, slow + 1)
}

```


2. **Middle of a linked list**

- Find the middle node of a linked list.
- Input: [0 1 2 3 4]
- Output: 2
- If the number of nodes is even, then return the second middle node.
- Input: [0 1 2 3 4 5]
- Output: 3

```js

getMiddleNode(head=this.head){
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }
    return slow.value;
}

const ll = new LinkedList(4)
ll.push(0)
ll.push(1)
ll.push(2)
ll.push(3)
ll.push(4)
ll.push(5)
console.log(ll.getMiddleNode());

```

3. **Move Zeros**

- Given an array of integers, move all the 0s to the back of the array while maintaining the relative order of the non-zero elements. Do this in-place using constant auxiliary space.

- Input:
[1, 0, 2, 0, 0, 7]

- Output:
[1, 2, 7, 0, 0, 0]

```js

function moveZeros(nums) {
    let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
            slow++;
        }
    }
    return nums
}

const nums = [1, 0, 2, 0, 0, 7]
console.log(moveZeros(nums))
```

## Opposite Directions

1. **Two Sum**

- Given an array of integers sorted in ascending order, find two numbers that add up to a given target. Return the indices of the two numbers in ascending order. You can assume elements in the array are unique and there is only one solution. Do this in O(n) time and with constant auxiliary space.

- Input:

- arr: a sorted integer array
- target: the target sum we want to reach
- Sample Input: [2, 3, 4, 5, 8, 11, 18], 8

- Sample Output: 1 3

```js
function twoSumSorted(arr, target) {
    let l = 0;
    let r = arr.length - 1;
    while (l < r) {
        const twoSum = arr[l] + arr[r];
        if (twoSum === target) {
            return [l, r];
        }
        if (twoSum < target) {
            l++;
        } else {
            r--;
        }
    }
    return [];
}
```

2. **Palindrome**
- a palindrome refers to a sequence (such as a string, number, or array) that reads the same backward as forward.
- Determine whether a string is a palindrome, ignoring non-alphanumeric characters and case. Examples:

- Input: Do geese see God? Output: True
- Input: Was it a car or a cat I saw? Output: True
- Input: A brown fox jumping over Output: False

```js

// simplified but creates new string same time complexity O(n)
function isPalindrome(s) {
    // Normalize the string: remove non-alphanumeric characters and convert to lowercase
    const normalizedStr = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    let l = 0;
    let r = normalizedStr.length - 1;
    while (l < r) {
        if (normalizedStr[l] !== normalizedStr[r]) {
            return false;
        }
        l++;
        r--;
    }
    return true;
}
```


3. **Container With Most Water**

- Given an array representing heights of vertical lines, find the maximum area of water trapped between two lines.

- Input: [1,8,6,2,5,4,8,3,7].
- Output: 49.

Formula for Area:
 A= w * h

```js
// simpl version
function containerwithMostwater(height){
    let l =0
    let r = height.length - 1
    let max_area = 0
    while (l<r) {
        let w = r - l
        let h = Math.min(height[l],height[r])
        let area = w * h
        max_area = Math.max(max_area,area)
        if(height[l] < height[r]){
            l++
        }else {
            r--
        }
    }
    return max_area
}

// clean version
function containerWithMostWater(height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;
    while (left < right) {
        const currentArea = Math.min(height[left], height[right]) * (right - left); // a = h * w
        maxArea = Math.max(maxArea, currentArea);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxArea;
}
```


# revised

```js
// Template 1: Same Direction (Fast and Slow pointers)
function sameDirectionTemplate(arr) {
    if (!arr || arr.length === 0) return 0;
    
    let slow = 0;  // Slow pointer starts at beginning
    
    // Fast pointer moves ahead
    for (let fast = 1; fast < arr.length; fast++) {
        // Compare elements or process based on condition
        if (condition(arr[fast], arr[slow])) {
            slow++;  // Move slow pointer
            // Usually some swap or assignment happens here
            arr[slow] = arr[fast];  // Or some other operation
        }
    }
    
    return slow + 1;  // Or return whatever is needed
}

// Template 2: Opposite Directions (Left and Right pointers)
function oppositeDirectionTemplate(arr) {
    if (!arr || arr.length === 0) return 0;
    
    let left = 0;                    // Left pointer starts at beginning
    let right = arr.length - 1;      // Right pointer starts at end
    
    while (left < right) {           // Continue until pointers meet
        // Process current elements
        let result = process(arr[left], arr[right]);
        
        // Decide which pointer to move based on condition
        if (condition(result)) {
            left++;
        } else {
            right--;
        }
    }
    
    return result;  // Return whatever is needed
}

// Example conditions:
function condition(a, b) {
    return a !== b;  // For removing duplicates
    // return a + b < target;  // For two sum
    // return a < b;  // For sorting
}

function process(a, b) {
    return a + b;  // For two sum
    // return Math.min(a, b) * (right - left);  // For container with water
    // return [a, b];  // For pair finding
}

```