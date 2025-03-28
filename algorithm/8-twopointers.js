// template
//  same direction
// remove duplicate
// let nums = [0,0,1,1,1,2,2]
// function removeDup(nums){
//     if(nums.length === 0) return 0
//     let slow = 0
//     for (let fast = 0; fast < nums.length; fast++) {
//         if(nums[fast] !== nums[slow]){
//             slow++
//             nums[slow] = nums[fast]
//         }
//     }
// }

// console.log(removeDup(nums));
// middle of linked list
// const getMiddle= (head=this.head)=>{
//     let slow = head
//     let fast = head
//     while(fast && fast.next){
//         fast = fast.next.next
//         slow= slow.next
//     }
//     return slow.value
// }


// console.log(getMiddle(nums));

//  move zeros
// let arr = [1,0,2,0,0,7]
// function moveZeros(nums){
//     let slow = 0
//     for (let fast = 0; fast < nums.length; fast++) {
//         if(nums[fast] !== 0){
//             [nums[slow],nums[fast]] = [nums[fast],nums[slow]]
//             slow++
//         }
//     }
//     return nums
// }
// console.log(moveZeros(arr));

// opposite direction

// let arr = [2, 3, 4, 5, 8, 11, 18]

// function twoSumSorted(nums,target){
//     let l = 0
//     let r = nums.length - 1
//     while(l<r){
//         const twoSum = nums[l] + nums[r]
//         if(twoSum === target){
//             return [nums[l],nums[r]]
//         }
//         if(twoSum < target){
//             l++
//         }else {
//             r--
//         }
//     }
//     return []
// }

// console.log("two sum",twoSumSorted(arr,9));

// let string = "luul"

// function isPalindrome(str){
//     let normalizeStr = str.replace(/[^a-zA-Z0-9]/g,'').toLowerCase()
//     let l = 0
//     let r = str.length - 1
//     while(l<r){
//         if(normalizeStr[l] !== normalizeStr[r]){
//             return false
//         }
//         l++
//         r--
//     }
//     return true
// }


// console.log(isPalindrome(string));


const isAnagram = (str1, str2) => {
  // Normalize both strings: remove non-alphanumeric characters and convert to lowercase
  let normalizeStr1 = str1.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  let normalizeStr2 = str2.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  // If lengths differ, they can't be anagrams
  if (normalizeStr1.length !== normalizeStr2.length) {
    return false;
  }

  const freqMap1 = {};
  const freqMap2 = {};

  // Count frequencies in the first string
  for (let char of normalizeStr1) {
    freqMap1[char] = (freqMap1[char] || 0) + 1;
  }

  // Count frequencies in the second string
  for (let char of normalizeStr2) {
    freqMap2[char] = (freqMap2[char] || 0) + 1;
  }

  // Compare frequency maps
  for (let char in freqMap1) {
    if (freqMap1[char] !== freqMap2[char]) {
      return false;
    }
  }

  return true;
};

const str1 = "listen";
const str2 = "silents";

console.log(isAnagram(str1, str2)); // true
