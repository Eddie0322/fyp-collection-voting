//import React from 'react';
import { SVD } from 'svd-js'
//import { useQuery, gql } from '@apollo/client';

    //Function that returns index of greatest value in an array
    function indexOfMax(arr) {
      if (arr.length === 0) {
          return -1;
      }
  
      var max = arr[0];
      var maxIndex = 0;
  
      for (var i = 1; i < arr.length; i++) {
          if (arr[i] > max) {
              maxIndex = i;
              max = arr[i];
          }
      }
  
      return maxIndex;
  }

    
    //Slice the random data array into matrices
    function partition(a, n) {
      return a.length ? [a.splice(0, n)].concat(partition(a, n)) : [];
    }  



    
export const calculatePCA = (valueData, initialValueData, votedCollections) => {

      let finalPCAdata = partition(valueData, 1000);
      //console.log(finalPCAdata);
      //console.log("Data for calculating label: ", initialValueData[0]);
      let labelArray = []

      //Assign label to each object
      for (let j = 0; j<1000; j++){
        
        let labelValueArray = [];
        labelValueArray.push(initialValueData[j].amusement)
        labelValueArray.push(initialValueData[j].intimate)
        labelValueArray.push(initialValueData[j].elegant)
        labelValueArray.push(initialValueData[j].lively)
        labelValueArray.push(initialValueData[j].spiritual)
        labelValueArray.push(initialValueData[j].calmness)
        labelValueArray.push(initialValueData[j].boredom)
        labelValueArray.push(initialValueData[j].strange)
        labelValueArray.push(initialValueData[j].mysterious)
        labelValueArray.push(initialValueData[j].anxiety)
        labelValueArray.push(initialValueData[j].sadness)
        labelValueArray.push(initialValueData[j].dread)

        labelArray.push(indexOfMax(labelValueArray))
      }
      
      //console.log(labelArray)
      //This first block computes each feature's average
      let averages = []
      for (let i = 0; i < 12; i++) {
        var tmp2 = 0
        for (let j = 0; j < 1000; j++) {
          tmp2 = tmp2 + finalPCAdata[i][j]
        }
        averages.push(tmp2/votedCollections.length)
      }
      
      //console.log(averages)
      
      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 1000; j++) {
          finalPCAdata[i][j] = finalPCAdata[i][j] - averages[i]
        }
      }

      //console.table(finalPCAdata)
      //Set up a covariance matrix
      var covar = []
      for (let i = 0; i < 12; i++) {
          var tmp3 = []
          for (let j = 0; j < 12; j++) {
              tmp3.push(0)
          }
        covar.push(tmp3)
      }
      //This block fills in the covariance matrix by increasingly summing the products
      for (let i = 0; i < 12; i++) {
          for (let j = 0; j < 12; j++) {
                for (let k = 0; k < 1000; k++) {
                      covar[i][j] = covar[i][j] + finalPCAdata[i][k]*finalPCAdata[j][k]
                }
          covar[i][j] = covar[i][j] / 999   //Here can be -0
          }
      }
      //console.table(covar)

      const { u, q } = SVD(covar, "f")
      //console.table(u)
      //console.log(q)
      
      var storeQarr = []
      function findIndicesOfMax(inp, count) {
        var outp = [];
        for (var i = 1; i < inp.length; i++) {
            outp.push(i); // add index to output array
            if (outp.length > count) {
                outp.sort(function(a, b) { return inp[b] - inp[a]; }); // descending sort the output array
                outp.pop(); // remove the last index (index of smallest element in output array)
            }
        }
        return outp;
    }
      storeQarr = findIndicesOfMax(q,3)

      //console.log(storeQarr)

      var projection = []
      var pc1 = 0, pc2 = 0, pc3 = 0
    
      for (let i = 0; i < 1000; i++) {
          pc1=0
          pc2=0
          pc3=0
          for (let j = 0; j < 12; j++) {
            pc1 = pc1 + u[j][storeQarr[0]] * finalPCAdata[j][i]
            pc2 = pc2 + u[j][storeQarr[1]] * finalPCAdata[j][i] 
            pc3 = pc3 + u[j][storeQarr[2]] * finalPCAdata[j][i]
          }
          var tmp4 = []
          tmp4.push(pc1)
          tmp4.push(pc2)
          tmp4.push(pc3)
          projection.push(tmp4)
    }


    return {
      projection: projection,
      labelArray: labelArray
    }
}
